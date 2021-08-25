document.addEventListener('DOMContentLoaded', () => {
  // const url = 'http://localhost:3000';
  const url = 'https://feedlr.vercel.app';
  const iframeUrl = url + '/widget/index.html';
  const styleUrl = url + '/widget.css';

  function addStyles() {
    const linkTag = document.createElement('link');
    linkTag.rel = 'stylesheet';
    linkTag.href = styleUrl;
    document.head.append(linkTag);
  }

  const div = document.createElement('div');

  // // Creating Iframe Tag
  const iframe = document.createElement('iframe');
  iframe.src = iframeUrl;
  iframe.width = '350';
  iframe.classList.add('feedlr-widget-sticky-bottom');
  iframe.setAttribute('loading', 'eager');
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

    window.addEventListener('message', (event) => {
      if (event.data === 'requested_url') {
        iframe.contentWindow.postMessage('url_is_here');
      }
      if (event.data === 'response_submitted') {
        iframe.height = '250px';
        setInterval(() => {
          iframe.height = 0;
        }, 1100);
      }
    });
  };

  function openModal() {
    // Injecting Iframe
    div.append(iframe);
    document.body.append(div);
  }

  function closeModal() {
    div.removeChild(iframe);
  }

  function changeIframeHeight() {
    iframe.height = iframe.contentWindow.document.body.scrollHeight + 'px';
  }

  // openModal();

  addStyles();
  openModal();
  changeIframeHeight();
});
