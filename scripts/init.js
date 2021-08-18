document.addEventListener('DOMContentLoaded', () => {
  const url = 'http://localhost:3000';
  const iframeUrl = url + '/widget/index.html';
  const styleUrl = url + '/widget.css';

  // Creating link tag
  const linkTag = document.createElement('link');
  linkTag.rel = 'stylesheet';
  linkTag.href = styleUrl;

  // Injecting link tag
  document.head.append(linkTag);

  // Creating Iframe Tag
  const iframe = document.createElement('iframe');
  iframe.src = iframeUrl;
  iframe.width = '350';
  iframe.classList.add('feedlr-widget-sticky-bottom');
  iframe.onload = function () {
    changeIframeHeight();

    const emojis_buttons =
      iframe.contentWindow.document.querySelectorAll('.emoji_radio');
    // const buttons = iframe.contentWindow.document.querySelectorAll('button');
    const submit_button =
      iframe.contentWindow.document.querySelector('.submit_button');
    emojis_buttons.forEach((btn) => {
      btn.addEventListener('change', () => {
        changeIframeHeight();
      });
    });

    submit_button.addEventListener('click', async () => {
      iframe.height = '250px';
      const res = await axios.post(url + '/api/responses/create');
      setInterval(() => {
        iframe.height = 0;
      }, 1100);
    });
  };

  function openModal() {
    // Injecting Iframe
    document.body.append(iframe);
  }

  function closeModal() {
    document.body.removeChild(iframe);
  }

  function changeIframeHeight() {
    iframe.height = iframe.contentWindow.document.body.scrollHeight + 'px';
  }

  openModal();
  changeIframeHeight();
});
