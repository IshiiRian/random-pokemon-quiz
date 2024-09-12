<script>
  import { createForm } from 'svelte-forms-lib';

  const { form, field, errors } = createForm({
    initialValues: { name: '' },
    validate: {
      name: value => (value ? '' : '名前は必須です')  //TODOアラートが表示されないので要修正//
    }
  });

  const onSubmit = values => {
    console.log('フォームの送信:', values);
  };
</script>

<form on:submit|preventDefault={form.handleSubmit(onSubmit)}>
  <label>
    名前:
    <input type="text" {...field('name')} />
    {#if errors.name}<p>{errors.name}</p>{/if}
  </label>
  <button type="submit">送信</button>
</form>
