/**
 * Every section of the site is declared here once. This config drives:
 *  - the admin forms           (fields)
 *  - server-side validation    (fields)
 *  - file cleanup on delete    (upload fields)
 *  - public rendering          (view.type -> components/views, view.map -> which field goes where)
 * To add a new section: add one entry. No other file needs to change.
 */
const f = {
  text: (name, o = {}) => ({ name, type: 'text', ...o }),
  area: (name, o = {}) => ({ name, type: 'textarea', ...o }),
  url: (name, o = {}) => ({ name, type: 'url', ...o }),
  upload: (name, type, o = {}) => ({ name, type, ...o }),
};

export const SECTIONS = [
  { key: 'about', label: 'About', singleton: true,
    fields: [f.text('name', { required: true }), f.text('title'), f.area('bio'), f.upload('photo', 'image')],
    view: { type: 'prose', map: { text: 'bio' } } },
  { key: 'interests', label: 'Interests', nav: false,
    fields: [f.text('name', { required: true })],
    view: { type: 'chips', map: { label: 'name' } } },
  { key: 'timeline', label: 'Timeline',
    fields: [f.text('year'), f.text('title', { required: true }), f.area('text')],
    view: { type: 'timeline', map: { meta: 'year', title: 'title', text: 'text' } } },
  { key: 'sights', label: 'Sights',
    fields: [f.text('title', { required: true }), f.text('place'), f.upload('photo', 'image')],
    view: { type: 'cards', map: { title: 'title', meta: 'place', image: 'photo' } } },
  { key: 'events', label: 'Events',
    fields: [f.text('date'), f.text('title', { required: true }), f.area('text')],
    view: { type: 'cards', map: { meta: 'date', title: 'title', text: 'text' } } },
  { key: 'gallery', label: 'Gallery',
    fields: [f.text('caption'), f.upload('src', 'media', { required: true })],
    view: { type: 'gallery', map: { src: 'src', caption: 'caption' } } },
  { key: 'certifications', label: 'Certifications',
    fields: [f.text('title', { required: true }), f.text('issuer'), f.text('year'), f.upload('file', 'file')],
    view: { type: 'cards', map: { meta: 'year', title: 'title', text: 'issuer', link: 'file' } } },
  { key: 'files', label: 'Files',
    fields: [f.text('title', { required: true }), f.upload('src', 'file', { required: true })],
    view: { type: 'links', map: { label: 'title', href: 'src' } } },
  { key: 'contacts', label: 'Contacts',
    fields: [f.text('label', { required: true }), f.url('url', { required: true })],
    view: { type: 'links', map: { label: 'label', href: 'url' } } },
];

export const getSection = (key) => SECTIONS.find((s) => s.key === key);
