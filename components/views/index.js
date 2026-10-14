import Prose from './Prose';
import Chips from './Chips';
import Timeline from './Timeline';
import Cards from './Cards';
import Gallery from './Gallery';
import Links from './Links';
/** Registry: section.view.type -> component. Add a new look here, then use it in config/sections.js. */
export const VIEWS = { prose: Prose, chips: Chips, timeline: Timeline, cards: Cards, gallery: Gallery, links: Links };
