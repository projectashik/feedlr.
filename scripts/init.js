document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://feedlr.vercel.app';
  const iframeUrl = url + '/widget/index.html';
  const styleUrl = url + 'widget.css';
  // Creating link tag
  const linkTag = document.createElement('link');
  linkTag.rel = 'stylesheet';
  linkTag.href = styleUrl;

  // Injecting link tag
  document.head.append(linkTag);

  // Creating Iframe Tag
  const iframe = document.createElement('iframe');
  iframe.src = iframeUrl;
  iframe.height = '451';
  iframe.width = '350';
  iframe.classList.add('feedlr-widget-iframe-sticky-bottom');

  // Injecting Iframe
  document.body.append(iframe);
});
