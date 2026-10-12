const dialog = document.querySelector('#image-dialog');
document.querySelector('#open-guide')?.addEventListener('click', () => dialog?.showModal());
document.querySelector('#close-guide')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      const value = button.dataset.copy;
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const input = document.createElement('textarea');
        input.value = value;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        if (!document.execCommand('copy')) throw new Error('copy failed');
        input.remove();
      }
      const original = button.textContent;
      button.textContent = 'คัดลอกแล้ว';
      button.classList.add('copied');
      window.setTimeout(() => { button.textContent = original; button.classList.remove('copied'); }, 1800);
    } catch {
      button.textContent = 'ลองใหม่';
      window.setTimeout(() => { button.textContent = 'คัดลอก'; }, 1800);
    }
  });
});
document.querySelectorAll('.copy-row.secondary .copy-button').forEach((button) => button.remove());
