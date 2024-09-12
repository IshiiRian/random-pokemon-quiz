import Quiz from './routes/quiz.svelte';

const app = new Quiz({
    target: document.body,  // コンポーネントを HTML の body にマウント
    props: {
        name: 'world'  // 必要に応じてプロパティを設定
    }
});

export default app;
