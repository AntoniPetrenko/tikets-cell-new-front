# ============================================
# Dockerfile для запуска предварительно собранного приложения
# ============================================
# Перед сборкой образа выполните на сервере:
# 1. npm install (установка node_modules)
# 2. npm run build (сборка приложения в .next)
# 3. docker build -t auto-hub .
# 4. docker run -p 3000:3000 auto-hub

FROM node:20-alpine
WORKDIR /app

# Создаём непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Переменные окружения для runtime
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Копируем готовые файлы приложения с сервера
COPY --chown=nextjs:nodejs ./public ./public
COPY --chown=nextjs:nodejs ./package.json ./package.json
COPY --chown=nextjs:nodejs ./.next ./.next
COPY --chown=nextjs:nodejs ./node_modules ./node_modules

# Используем непривилегированного пользователя
USER nextjs

EXPOSE 3000

# Health check для мониторинга
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/card-info', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Запускаем production сервер
CMD ["npm", "run", "start"]
