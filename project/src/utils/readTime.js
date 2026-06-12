export function getReadTime(markdown, options = {}) {
  const {
    wordsPerMinute = 200,           
    imageTimeFirst = 12,            
    imageTimeSecond = 11,            
    imageTimeThird = 10,          
    imageTimeMin = 3,               
    codeBlockWordsPerMinute = 50,   
  } = options;
  const imageRegex = /!\[[^\]]*\]\([^)]+\)/g;
  const imageMatches = markdown.match(imageRegex) || [];
  const imageCount = imageMatches.length;
  let imageTotalSeconds = 0;
  for (let i = 0; i < imageCount; i++) {
    let time = imageTimeFirst - i;
    if (time < imageTimeMin) time = imageTimeMin;
    imageTotalSeconds += time;
  }
  const imageMinutes = imageTotalSeconds / 60;
  let plainText = markdown.replace(/```[\s\S]*?```/g, '');
  plainText = plainText.replace(/`[^`]*`/g, '');
  plainText = plainText.replace(imageRegex, '');
  plainText = plainText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  plainText = plainText.replace(/[*_~#>|]/g, '');
  plainText = plainText.replace(/\s+/g, ' ').trim();
  const plainWords = plainText ? plainText.split(' ').length : 0;
  const codeBlockRegex = /```[\s\S]*?```/g;
  let codeWords = 0;
  let match;
  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    const code = match[0]
      .replace(/```\w*\n?/, '')
      .replace(/```$/, '')
      .trim();
    if (code) codeWords += code.split(/\s+/).length;
  }
  const plainMinutes = plainWords / wordsPerMinute;
  const codeMinutes = codeWords / codeBlockWordsPerMinute;
  const totalMinutes = plainMinutes + codeMinutes + imageMinutes;
  return Math.max(1, Math.ceil(totalMinutes));
}