const domain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://my-next-app-t8c.pages.dev/'

export const resolveDomain = (path: string) => {
  const url = new URL(path, domain)
  return url.toString();
}

export const data = {
  fusions: '0000',
  enhancements: '0000',
  mints: '0000',
  gstEarned: '0000',
  gmtEarned: '0000',
  kms: '0000',
  hours: '0000',
  energyConsumed: '0000',
  gemUpgrades: '0000',
  activeDays: '0000',
  badgesClaimed: '0000',
  achievementPointsEarned: '0000'
}
