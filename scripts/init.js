document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://feedlr.vercel.app';
  const iframeUrl = url + '/widget/index.html';
  const styleUrl = url + '/widget.css';

  // Creating link tag
  const linkTag = document.createElement('link');
  linkTag.rel = 'stylesheet';
  linkTag.href = styleUrl;

  // Injecting link tag
  document.head.append(linkTag);

  //
  const container = document.createElement('div');

  // Creating Iframe Tag
  const iframe = document.createElement('iframe');
  iframe.src = iframeUrl;
  iframe.width = '350';
  iframe.classList.add('feedlr-widget-iframe-bottom');
  iframe.classList.add('feedlr-widget-sticky-bottom');
  iframe.onload = function () {
    changeIframeHeight();

    const emojis_buttons =
      iframe.contentWindow.document.querySelectorAll('.emoji_radio');
    emojis_buttons.forEach((btn) => {
      btn.addEventListener('change', () => {
        changeIframeHeight();
      });
    });
  };

  // Create Close Button
  const button = document.createElement('button');
  button.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="feather feather-x"
>
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>`;
  button.classList.add('feedlr-widget-close_button');
  button.onclick = closeModal;

  function openModal() {
    container.append(iframe);
    container.append(button);
    // Injecting Iframe
    document.body.append(iframe);
  }

  function closeModal() {
    document.body.removeChild(container);
  }

  function changeIframeHeight() {
    iframe.style.height =
      iframe.contentWindow.document.body.scrollHeight + 10 + 'px';
  }

  openModal();
  changeIframeHeight();
});
