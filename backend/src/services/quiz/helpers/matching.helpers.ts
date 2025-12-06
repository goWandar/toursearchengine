function calculateTourMatch(
  userTags: Array<{ tagKey: string; importance: number }>,
  tourTags: string[],
): number {
  let matchedScore = 0;
  let totalPossibleScore = 0;

  // Check each user tag
  for (const userTag of userTags) {
    totalPossibleScore += userTag.importance;

    // Does tour have this tag?
    if (tourTags.includes(userTag.tagKey)) {
      matchedScore += userTag.importance;
    }
  }

  // Calculate percentage
  const matchPercentage = (matchedScore / totalPossibleScore) * 100;

  return Math.round(matchPercentage);
}

export { calculateTourMatch };
