const base_url = 'http://localhost:3000';
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

const submit_button = document.querySelector('.submit_button');
submit_button.addEventListener('click', async () => {
  // const res = await axios.post(base_url + '/api/responses/create');
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
