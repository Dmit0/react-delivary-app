export const roles = [
  { name: 'BASE', opportunities: ['RANK_UP'] },
  { name: 'VERIFIED', opportunities: ['RANK_UP', 'BUY'] },
  { name: 'CUSTOMER', opportunities: ['CREATE_MARKET'] },
  { name: 'MAIN_ADMIN', opportunities: ['CREATE_ADMINS','DELETE_USER'] },
  { name: 'SUB_ADMIN', opportunities: ['CREATE_ADMINS'] },
];