const core = require("@actions/core");
const github = require("@actions/github");
const utils = require("../utils");

// Mock the required modules
jest.mock("@actions/core");
jest.mock("@actions/github");
jest.mock("../utils");

// Import the function to test
const { run } = require("../index");

describe("PR Labels Checker", () => {
  const mockSetOutput = jest.fn();
  const mockSetFailed = jest.fn();
  const mockGetInput = jest.fn();
  const mockListLabelsOnIssue = jest.fn();
  const mockOctokit = {
    rest: {
      issues: {
        listLabelsOnIssue: mockListLabelsOnIssue,
      },
    },
  };

  beforeEach(() => {
    // Reset all mocks
    jest.resetAllMocks();

    // Setup core mocks
    core.getInput.mockImplementation(mockGetInput);
    core.setOutput.mockImplementation(mockSetOutput);
    core.setFailed.mockImplementation(mockSetFailed);

    // Setup GitHub context mock
    github.context = {
      repo: { owner: "test-owner", repo: "test-repo" },
      payload: {
        pull_request: { number: 123 },
      },
    };

    // Setup Octokit mock
    github.getOctokit.mockReturnValue(mockOctokit);

    // Setup utils mock
    utils.parseInputTags.mockImplementation((input) => {
      if (!input) return [];
      return input.split(",").map((tag) => tag.trim());
    });
  });

  // Test cases
  test("should pass when PR has all required labels", async () => {
    // Setup inputs
    mockGetInput.mockImplementation((name) => {
      switch (name) {
        case "githubToken":
          return "mock-token";
        case "hasAll":
          return "bug,enhancement";
        case "hasSome":
          return "bug,feature";
        case "hasNone":
          return "invalid";
        case "hasNotAll":
          return "wontfix,duplicate";
        default:
          return "";
      }
    });

    // Mock PR labels from GitHub API
    mockListLabelsOnIssue.mockResolvedValue({
      data: [{ name: "bug" }, { name: "enhancement" }, { name: "feature" }],
    });

    // Run the function
    await run();

    // Assertions
    expect(mockSetFailed).not.toHaveBeenCalled();
    expect(mockSetOutput).toHaveBeenCalledWith("passed", true);
  });

  // Add all other test cases here...
});
