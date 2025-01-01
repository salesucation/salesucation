import { describe, it, expect } from 'vitest'
import app from '../src/index'

describe('hono app test', () => {
    it('/hello', async () => {
        const res = await app.request('/')
        const text = await res.text()
        console.log(text);
        expect(res.status).toBe(200)
        expect(text).toBe('Hello Hono!')
    })
});