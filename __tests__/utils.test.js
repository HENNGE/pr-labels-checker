const { parseInputTags } = require('../utils');  
  
describe('parseInputTags', () => {  
  test('should parse comma-separated input', () => {  
    const input = 'label1,label2,label3';  
    expect(parseInputTags(input)).toEqual(['label1', 'label2', 'label3']);  
  });  
  
  test('should parse newline-separated input', () => {  
    const input = 'label1\nlabel2\nlabel3';  
    expect(parseInputTags(input)).toEqual(['label1', 'label2', 'label3']);  
  });  
  
  test('should trim whitespace from labels', () => {  
    const input = '  label1  ,  label2  ';  
    expect(parseInputTags(input)).toEqual(['label1', 'label2']);  
  });  
  
  test('should filter out empty labels', () => {  
    const input = 'label1,,label2,';  
    expect(parseInputTags(input)).toEqual(['label1', 'label2']);  
  });  
});