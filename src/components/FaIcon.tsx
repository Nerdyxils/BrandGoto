import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faBell,
  faBolt,
  faBullseye,
  faChartLine,
  faCheck,
  faChess,
  faCode,
  faCodeBranch,
  faCoins,
  faComments,
  faDatabase,
  faDollarSign,
  faEnvelope,
  faFileCode,
  faGears,
  faGlobe,
  faHandshake,
  faLayerGroup,
  faLaptopCode,
  faListCheck,
  faMagnifyingGlass,
  faMinus,
  faPaintBrush,
  faPalette,
  faPaperPlane,
  faPlus,
  faRobot,
  faRocket,
  faRoute,
  faSitemap,
  faTachometerAlt,
  faTriangleExclamation,
  faUser,
  faUserTie,
  faUsers,
  faWandMagicSparkles,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  faAws,
  faDocker,
  faFigma,
  faGithub,
  faGitlab,
  faHubspot,
  faInstagram,
  faJira,
  faKubernetes,
  faLinkedinIn,
  faNodeJs,
  faOpenai,
  faPython,
  faReact,
  faSlack,
  faStripe,
  faWebflow,
  faWpforms,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

const icons: Record<string, IconDefinition> = {
  'arrow-left': faArrowLeft,
  'arrow-right': faArrowRight,
  'arrow-up-right-from-square': faArrowUpRightFromSquare,
  aws: faAws,
  bell: faBell,
  bolt: faBolt,
  bullseye: faBullseye,
  'chart-line': faChartLine,
  check: faCheck,
  chess: faChess,
  code: faCode,
  'code-branch': faCodeBranch,
  coins: faCoins,
  comments: faComments,
  cogs: faGears,
  database: faDatabase,
  docker: faDocker,
  'dollar-sign': faDollarSign,
  envelope: faEnvelope,
  figma: faFigma,
  'file-code': faFileCode,
  github: faGithub,
  gitlab: faGitlab,
  globe: faGlobe,
  handshake: faHandshake,
  hubspot: faHubspot,
  instagram: faInstagram,
  jira: faJira,
  kubernetes: faKubernetes,
  'layer-group': faLayerGroup,
  'laptop-code': faLaptopCode,
  'linkedin-in': faLinkedinIn,
  magic: faWandMagicSparkles,
  minus: faMinus,
  'node-js': faNodeJs,
  openai: faOpenai,
  'paint-brush': faPaintBrush,
  palette: faPalette,
  'paper-plane': faPaperPlane,
  plus: faPlus,
  python: faPython,
  react: faReact,
  robot: faRobot,
  rocket: faRocket,
  route: faRoute,
  search: faMagnifyingGlass,
  sitemap: faSitemap,
  slack: faSlack,
  stripe: faStripe,
  tachometer: faTachometerAlt,
  'tachometer-alt': faTachometerAlt,
  tasks: faListCheck,
  'times': faXmark,
  'exclamation-triangle': faTriangleExclamation,
  user: faUser,
  'user-tie': faUserTie,
  users: faUsers,
  webflow: faWebflow,
  wpforms: faWpforms,
  'x-twitter': faXTwitter,
};

interface FaIconProps {
  name: string;
  className?: string;
  style?: React.ComponentProps<typeof FontAwesomeIcon>['style'];
  title?: string;
}

const normalizeIconName = (name: string) => {
  const iconClass = name.split(/\s+/).find((value) => value.startsWith('fa-') && !['fa-solid', 'fa-brands'].includes(value));
  return (iconClass ?? name).replace(/^fa-/, '');
};

const FaIcon: React.FC<FaIconProps> = ({ name, className, style, title }) => {
  const icon = icons[normalizeIconName(name)];

  if (!icon) return null;

  return <FontAwesomeIcon icon={icon} className={className} style={style} title={title} aria-hidden={title ? undefined : true} />;
};

export default FaIcon;
