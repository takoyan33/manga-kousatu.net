// mock作成
jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({
      currentUser: { uid: 'test-user', email: 'test@example.com' },
    })),
  }
})
