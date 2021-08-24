// const base_url = 'http://localhost:3000';
const base_url = 'https://feedlr.vercel.app';

const emojis_fields = document.querySelectorAll('.emoji_radio');
const feedback_section = document.querySelector('.feedback_section');
let reaction;
emojis_fields.forEach((field) => {
  field.addEventListener('change', (e) => {
    feedback_section.style.display = 'flex';
    reaction = field.value;
    window.parent.postMessage('reaction_selected');
  });
});

// Actual work reside here
const root = document.querySelector(':root');
const body = document.querySelector('.dark');

function projectData() {
  return {
    project: [],
    init() {
      fetch('/api/projects/widget?url=feedlr.com')
        .then((response) => response.json())
        .then((data) => {
          this.project = data;
          console.log(this.project);
          root.style.setProperty(
            '--primary-color',
            '#' +
              (this.project?.setting
                ? this.project.setting.lightModeButtonColor
                : '9261DF')
          );
          body.style.setProperty(
            '--primary-color',
            '#' +
              (this.project?.setting
                ? this.project.setting.darkModeButtonColor
                : '9261DF')
          );

          root.style.setProperty(
            '--button-color',
            '#' +
              (this.project?.setting
                ? this.project.setting.lightModeButtonColor
                : '9261DF')
          );
          body.style.setProperty(
            '--button-color',
            '#' +
              (this.project?.setting
                ? this.project.setting.darkModeButtonColor
                : '9261DF')
          );

          root.style.setProperty(
            '--widget-bg',
            '#' +
              (this.project?.setting
                ? this.project.setting.lightModeBackground
                : 'ffffff')
          );
          body.style.setProperty(
            '--widget-bg',
            '#' +
              (this.project?.setting
                ? this.project.setting.darkModeBackground
                : '0F0F0F')
          );

          root.style.setProperty(
            '--text-color',
            '#' +
              (this.project?.setting
                ? this.project.setting.lightModeTextColor
                : '000000')
          );
          body.style.setProperty(
            '--text-color',
            '#' +
              (this.project?.setting
                ? this.project.setting.darkModeTextColor
                : 'ffffff')
          );
        });
    },
  };
}

const feedback_form = document.querySelector('#feedback_form');
feedback_form.addEventListener('submit', () => {
  const email = document.querySelector('#email_field').value;
  const feedback = document.querySelector('#feedback').value;

  if (email.length > 0 && feedback.length > 0) {
    window.parent.postMessage('requested_url');
    let url = window.parent.location.href;
    const res = axios.post('/api/responses/create', {
      email,
      feedback,
      url,
    });
    window.parent.postMessage('response_submitted');
  }
});
