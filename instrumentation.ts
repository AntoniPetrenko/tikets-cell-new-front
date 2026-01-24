export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    process.on('uncaughtException', (error: Error) => {
      if ('code' in error && error.code === 'ECONNRESET') {
        console.warn('[WARN] Client connection reset:', error.message);
        return;
      }


      console.error('[CRITICAL] Uncaught Exception:', error);
    });


    process.on('unhandledRejection', (reason: any) => {
      if (reason?.code === 'ECONNRESET') {
        console.warn('[WARN] Client connection reset in promise');
        return;
      }

      console.error('[CRITICAL] Unhandled Promise Rejection:', reason);
    });

    console.log('[INFO] Error handlers registered');
  }
}
