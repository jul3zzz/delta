/* ============================================================
   Delta — boutique (themes, avatars, bannieres, cadres, titres, fonds)
   et succes.
   Les themes repeignent l'interface en clair ET en sombre.
   ============================================================ */
const SHOP = { theme: [], avatar: [], banner: [], frame: [], title: [], back: [] };
const T = (id, n, prix, d, vars) => SHOP.theme.push({ id: id, n: n, prix: prix, d: d, vars: vars });
const A = (id, n, prix, ops) => SHOP.avatar.push({ id: id, n: n, prix: prix, ops: ops });
const B = (id, n, prix, css) => SHOP.banner.push({ id: id, n: n, prix: prix, css: css });
const C = (id, n, prix, css) => SHOP.frame.push({ id: id, n: n, prix: prix, css: css });
const TI = (id, n, prix) => SHOP.title.push({ id: id, n: n, prix: prix });
const D = (id, n, prix, css) => SHOP.back.push({ id: id, n: n, prix: prix, css: css });

/* ---------------- THEMES ---------------- */
T('th-atlas', 'Atlas de poche', 0, 'Le parchemin d’origine : encre brune et bleu de carte.', null);

T('th-encre', 'Encre de Chine', 420, 'Papier blanc cassé, encre profonde, un seul accent bleu nuit.', {
  light: { '--paper': '#F2F1ED', '--paper2': '#E8E7E2', '--surface': '#FDFDFB', '--surface2': '#F4F4F0', '--line': '#D2D1CB', '--line2': '#E6E5E0', '--ink': '#16181C', '--ink2': '#33373D', '--muted': '#63686F', '--faint': '#8D939B', '--brand': '#1B3A6B', '--brand-ink': '#0E2A52', '--brand-soft': '#DEE5F0', '--grid': 'rgba(30,40,60,.05)', '--grid2': 'rgba(30,40,60,.09)' },
  dark: { '--paper': '#0B0D11', '--paper2': '#111419', '--surface': '#171B21', '--surface2': '#1E232B', '--line': '#2E343D', '--line2': '#242A32', '--ink': '#EDEFF3', '--ink2': '#CBD1DA', '--muted': '#8D96A2', '--faint': '#6B747F', '--brand': '#7FA7DE', '--brand-ink': '#A3C1EC', '--brand-soft': '#152134', '--grid': 'rgba(150,180,220,.045)', '--grid2': 'rgba(150,180,220,.08)' }
});

T('th-terre', 'Terre de Sienne', 480, 'Ocres, briques et sable : la palette des cartes anciennes.', {
  light: { '--paper': '#F3EAD9', '--paper2': '#EADFC9', '--surface': '#FDF8EF', '--surface2': '#F6EEDF', '--line': '#DAC7A6', '--line2': '#EDE2CD', '--ink': '#2A1E12', '--ink2': '#4A3823', '--muted': '#7A6549', '--faint': '#A08A6B', '--brand': '#A6541F', '--brand-ink': '#853F14', '--brand-soft': '#F6E3D2', '--grid': 'rgba(140,100,50,.06)', '--grid2': 'rgba(140,100,50,.11)' },
  dark: { '--paper': '#130E08', '--paper2': '#1A140C', '--surface': '#221A11', '--surface2': '#2B2116', '--line': '#413320', '--line2': '#302518', '--ink': '#F5EBDA', '--ink2': '#DCCBB1', '--muted': '#A2907A', '--faint': '#847258', '--brand': '#E5904F', '--brand-ink': '#F2AC74', '--brand-soft': '#38210F', '--grid': 'rgba(230,190,130,.05)', '--grid2': 'rgba(230,190,130,.09)' }
});

T('th-ocean', 'Grand Océan', 520, 'Bleus de haute mer et écume : la France des trois océans.', {
  light: { '--paper': '#E7EFF3', '--paper2': '#DCE7ED', '--surface': '#F8FCFE', '--surface2': '#EDF4F8', '--line': '#BCD1DC', '--line2': '#DCE8EE', '--ink': '#0C1D26', '--ink2': '#23404E', '--muted': '#4F6E7D', '--faint': '#7E9AA8', '--brand': '#0E6E8E', '--brand-ink': '#09526C', '--brand-soft': '#D7EAF2', '--grid': 'rgba(20,80,110,.055)', '--grid2': 'rgba(20,80,110,.10)' },
  dark: { '--paper': '#05121A', '--paper2': '#081A24', '--surface': '#0D2430', '--surface2': '#122E3B', '--line': '#1F4353', '--line2': '#173441', '--ink': '#E2F1F7', '--ink2': '#B9D4E0', '--muted': '#84A6B5', '--faint': '#628394', '--brand': '#4EC0E4', '--brand-ink': '#7BD5F1', '--brand-soft': '#0B3243', '--grid': 'rgba(120,200,230,.05)', '--grid2': 'rgba(120,200,230,.09)' }
});

T('th-archive', 'Salle d’archives', 560, 'Vert-de-gris, carton bulle et néons discrets.', {
  light: { '--paper': '#E9EDE6', '--paper2': '#DEE4DA', '--surface': '#FAFCF8', '--surface2': '#F0F4EC', '--line': '#C6D0BF', '--line2': '#E1E8DC', '--ink': '#14190F', '--ink2': '#313A28', '--muted': '#5F6B54', '--faint': '#8B9880', '--brand': '#3F6B33', '--brand-ink': '#2C5023', '--brand-soft': '#DFEBD9', '--grid': 'rgba(60,90,40,.055)', '--grid2': 'rgba(60,90,40,.10)' },
  dark: { '--paper': '#0A0F08', '--paper2': '#0F160C', '--surface': '#151D11', '--surface2': '#1C2617', '--line': '#2C3A25', '--line2': '#212C1C', '--ink': '#EAF2E4', '--ink2': '#C7D4BE', '--muted': '#93A288', '--faint': '#6F7D66', '--brand': '#7FC46A', '--brand-ink': '#9FD98E', '--brand-soft': '#16290F', '--grid': 'rgba(160,210,140,.045)', '--grid2': 'rgba(160,210,140,.085)' }
});

T('th-tricolore', 'Tricolore', 640, 'Bleu, blanc et rouge — sobre, pas criard.', {
  light: { '--paper': '#EFF0F4', '--paper2': '#E4E6EC', '--surface': '#FFFFFF', '--surface2': '#F3F5F9', '--line': '#CBD0DC', '--line2': '#E4E7EE', '--ink': '#12151F', '--ink2': '#2E3444', '--muted': '#5C6377', '--faint': '#89909F', '--brand': '#1D3D8F', '--brand-ink': '#152C6B', '--brand-soft': '#DEE4F5', '--grid': 'rgba(30,50,120,.05)', '--grid2': 'rgba(30,50,120,.09)' },
  dark: { '--paper': '#080A11', '--paper2': '#0D1019', '--surface': '#131824', '--surface2': '#1A2030', '--line': '#2A3245', '--line2': '#1F2637', '--ink': '#ECEEF6', '--ink2': '#C8CDDD', '--muted': '#8E96AA', '--faint': '#6C7488', '--brand': '#7B9BEE', '--brand-ink': '#9FB7F5', '--brand-soft': '#131E3C', '--grid': 'rgba(150,175,240,.045)', '--grid2': 'rgba(150,175,240,.085)' }
});

T('th-nuit', 'Veillée d’étude', 700, 'Un thème pensé pour réviser tard : contrastes doux, fond profond.', {
  light: { '--paper': '#E6E4E9', '--paper2': '#DCDAE1', '--surface': '#FAF9FC', '--surface2': '#F0EEF4', '--line': '#C9C5D2', '--line2': '#E2DFE8', '--ink': '#16131C', '--ink2': '#332E3D', '--muted': '#615A6E', '--faint': '#8C8599', '--brand': '#5B3E9B', '--brand-ink': '#452C7C', '--brand-soft': '#E7E0F5', '--grid': 'rgba(80,50,130,.05)', '--grid2': 'rgba(80,50,130,.09)' },
  dark: { '--paper': '#0A0810', '--paper2': '#100D18', '--surface': '#171320', '--surface2': '#1F1A2B', '--line': '#332B44', '--line2': '#261F33', '--ink': '#EFECF6', '--ink2': '#CDC6DC', '--muted': '#978FA9', '--faint': '#736C86', '--brand': '#AE8FF0', '--brand-ink': '#C4ADF6', '--brand-soft': '#221735', '--grid': 'rgba(180,150,240,.045)', '--grid2': 'rgba(180,150,240,.085)' }
});

T('th-cassini', 'Carte de Cassini', 820, 'Sépia intense, quadrillage de triangulation, tout en vieux papier.', {
  light: { '--paper': '#EDE3CE', '--paper2': '#E2D6BC', '--surface': '#FAF4E6', '--surface2': '#F2E9D5', '--line': '#CDB894', '--line2': '#E4D8BE', '--ink': '#2B2010', '--ink2': '#4B3A20', '--muted': '#7C6743', '--faint': '#A38F68', '--brand': '#6A4A1C', '--brand-ink': '#4E3512', '--brand-soft': '#EBDFC4', '--grid': 'rgba(120,90,40,.08)', '--grid2': 'rgba(120,90,40,.14)' },
  dark: { '--paper': '#12100A', '--paper2': '#19160E', '--surface': '#211C13', '--surface2': '#2A2419', '--line': '#403624', '--line2': '#2F281B', '--ink': '#F3E9D3', '--ink2': '#DACBAA', '--muted': '#A2926F', '--faint': '#867453', '--brand': '#D6B072', '--brand-ink': '#E8CA96', '--brand-soft': '#332811', '--grid': 'rgba(220,190,130,.06)', '--grid2': 'rgba(220,190,130,.11)' }
});

T('th-neige', 'Papier neige', 900, 'Blanc pur, gris minéral, un seul rouge : la lisibilité maximale.', {
  light: { '--paper': '#F7F7F8', '--paper2': '#EDEDEF', '--surface': '#FFFFFF', '--surface2': '#F4F4F6', '--line': '#D6D6DA', '--line2': '#E9E9EC', '--ink': '#0F0F11', '--ink2': '#2C2C31', '--muted': '#5E5E66', '--faint': '#8B8B94', '--brand': '#B32020', '--brand-ink': '#8C1717', '--brand-soft': '#F8E0E0', '--grid': 'rgba(0,0,0,.035)', '--grid2': 'rgba(0,0,0,.07)' },
  dark: { '--paper': '#070708', '--paper2': '#0D0D0F', '--surface': '#141416', '--surface2': '#1C1C1F', '--line': '#2C2C31', '--line2': '#212124', '--ink': '#F3F3F5', '--ink2': '#CFCFD4', '--muted': '#96969E', '--faint': '#73737B', '--brand': '#F07070', '--brand-ink': '#F79797', '--brand-soft': '#331414', '--grid': 'rgba(255,255,255,.035)', '--grid2': 'rgba(255,255,255,.07)' }
});

/* ---------------- AVATARS (dessines) ---------------- */
A('av-boussole', 'Boussole', 0, [['c', 32, 32, 24, 'b:18', 'b'], ['poly', [[32, 12], [38, 32], [32, 52], [26, 32]], 'k:60', 'i', 1], ['poly', [[32, 12], [38, 32], [26, 32]], 'k', '', 0], ['c', 32, 32, 3, 'i', '']]);
A('av-globe', 'Globe', 140, [['c', 32, 32, 23, 'g:24', 'g'], ['path', 'M9 32h46M32 9v46', 'none', 'g', 1.4], ['path', 'M32 9 C18 20 18 44 32 55 C46 44 46 20 32 9', 'none', 'g', 1.4], ['path', 'M13 21 q19 8 38 0 M13 43 q19 -8 38 0', 'none', 'g', 1.2]]);
A('av-plume', 'Plume', 160, [['path', 'M16 50 C24 24 40 12 52 12 C52 28 40 44 20 48 z', 'c:34', 'i', 1.6], ['l', 16, 50, 32, 34, 'i', 1.6], ['l', 12, 54, 18, 48, 'i', 2]]);
A('av-sablier', 'Sablier', 180, [['path', 'M18 10 h28 v6 l-14 16 l14 16 v6 h-28 v-6 l14 -16 l-14 -16 z', 'w:30', 'i', 1.8], ['path', 'M22 14 h20 l-10 12 z', 'w', '', 0], ['path', 'M24 50 h16 l-8 -10 z', 'w', '', 0]]);
A('av-marianne', 'Marianne', 220, [['c', 32, 30, 14, 'S2', 'i'], ['path', 'M20 26 q12 -18 24 -2 q-4 -8 -12 -8 q-10 0 -12 10 z', 'k:60', 'k', 1.2], ['c', 27, 30, 1.8, 'i', ''], ['c', 37, 30, 1.8, 'i', ''], ['path', 'M18 54 q14 -16 28 0 z', 'b:30', 'i', 1.4]]);
A('av-hexagone', 'Hexagone', 240, [['poly', [[32, 8], [52, 20], [52, 44], [32, 56], [12, 44], [12, 20]], 'b:26', 'b', 2], ['t', 32, 38, 'FR', 15, 'middle', 'b', 700]]);
A('av-delta', 'Delta', 320, [['poly', [[32, 10], [54, 52], [10, 52]], 'h:28', 'h', 2.4], ['t', 32, 46, 'δ', 20, 'middle', 'h', 700]]);
A('av-fusee', 'Fusée', 300, [['path', 'M32 8 q9 16 9 32 h-18 q0 -16 9 -32 z', 'S2', 'i', 1.8], ['path', 'M23 40 l-8 12 h8 z', 'h:50', 'i', 1.4], ['path', 'M41 40 l8 12 h-8 z', 'h:50', 'i', 1.4], ['c', 32, 26, 4, 'b', 'i'], ['path', 'M28 52 q4 12 8 0 q-4 16 -8 0 z', 'c', 'c', 1]]);
A('av-tour', 'Tour Eiffel', 340, [['path', 'M32 6 l-4 16 h8 z', 'i:40', 'i', 1.2], ['path', 'M26 22 l-12 34 h8 l10 -30 l10 30 h8 l-12 -34 z', 'i:30', 'i', 1.4], ['l', 21, 40, 43, 40, 'i', 1.6], ['l', 24, 30, 40, 30, 'i', 1.4]]);
A('av-livre', 'Livre ouvert', 260, [['path', 'M8 20 q12 -6 24 0 v28 q-12 -6 -24 0 z', 'S', 'i', 1.6], ['path', 'M56 20 q-12 -6 -24 0 v28 q12 -6 24 0 z', 'S', 'i', 1.6], ['l', 32, 20, 32, 48, 'i', 1.6], ['l', 14, 28, 26, 26, 'l', 1], ['l', 14, 34, 26, 32, 'l', 1], ['l', 50, 28, 38, 26, 'l', 1], ['l', 50, 34, 38, 32, 'l', 1]]);
A('av-balance', 'Balance', 380, [['l', 32, 12, 32, 50, 'i', 2.2], ['l', 14, 20, 50, 20, 'i', 2], ['path', 'M14 20 l-6 12 h12 z', 'e:34', 'i', 1.2], ['path', 'M50 20 l-6 12 h12 z', 'e:34', 'i', 1.2], ['r', 22, 50, 20, 4, 'i', 'i', 1.4]]);
A('av-frise', 'Frise', 400, [['l', 8, 34, 56, 34, 'i', 2.2], ['c', 18, 34, 3.5, 'h', ''], ['c', 32, 34, 3.5, 'b', ''], ['c', 46, 34, 3.5, 'g', ''], ['l', 18, 34, 18, 22, 'h', 1.4], ['l', 32, 34, 32, 46, 'b', 1.4], ['l', 46, 34, 46, 22, 'g', 1.4]]);
A('av-etoiles', 'Douze étoiles', 460, [['c', 32, 32, 22, 'b:26', 'b'], ['sym', 32, 14, 'etoile', 'c', 4], ['sym', 45, 19, 'etoile', 'c', 4], ['sym', 50, 32, 'etoile', 'c', 4], ['sym', 45, 45, 'etoile', 'c', 4], ['sym', 32, 50, 'etoile', 'c', 4], ['sym', 19, 45, 'etoile', 'c', 4], ['sym', 14, 32, 'etoile', 'c', 4], ['sym', 19, 19, 'etoile', 'c', 4]]);
A('av-flamme', 'Flamme du souvenir', 620, [['c', 32, 34, 21, 'c:16', 'c'], ['path', 'M32 50 c-9 -8 -12 -15 -8 -22 c2 -4 6 -5 8 -9 c2 4 6 5 8 9 c4 7 1 14 -8 22 z', 'c:60', 'c', 1.6], ['r', 20, 50, 24, 5, 'i', 'i', 1.4]]);
A('av-cassini', 'Triangulation', 780, [['poly', [[32, 10], [54, 48], [10, 48]], 'none', 'c', 1.6], ['poly', [[32, 10], [32, 48], [10, 48]], 'none', 'c', 1], ['c', 32, 10, 3, 'c', ''], ['c', 54, 48, 3, 'c', ''], ['c', 10, 48, 3, 'c', ''], ['c', 32, 48, 2.4, 'c', '']]);

/* ---------------- BANNIERES ---------------- */
B('ba-graticule', 'Graticule', 0, 'background:linear-gradient(135deg,color-mix(in srgb,var(--brand) 22%,var(--surface)),var(--surface));background-image:linear-gradient(var(--grid2) 1px,transparent 1px),linear-gradient(90deg,var(--grid2) 1px,transparent 1px);background-size:100% 100%,18px 18px,18px 18px');
B('ba-relief', 'Courbes de niveau', 180, 'background:var(--surface2);background-image:repeating-radial-gradient(circle at 22% 130%,transparent 0 12px,color-mix(in srgb,var(--geo) 26%,transparent) 12px 13px)');
B('ba-frise', 'Frise du siècle', 220, 'background:linear-gradient(90deg,color-mix(in srgb,var(--hist) 30%,var(--surface)) 0 20%,color-mix(in srgb,var(--warn) 26%,var(--surface)) 20% 45%,color-mix(in srgb,var(--brand) 26%,var(--surface)) 45% 75%,color-mix(in srgb,var(--geo) 26%,var(--surface)) 75% 100%)');
B('ba-tricolore', 'Tricolore', 260, 'background:linear-gradient(90deg,#1D3D8F 0 33%,var(--surface) 33% 66%,#B32020 66% 100%);opacity:.85');
B('ba-marees', 'Marées', 300, 'background:var(--surface2);background-image:repeating-linear-gradient(75deg,color-mix(in srgb,#2C5F8A 24%,transparent) 0 4px,transparent 4px 14px)');
B('ba-archives', 'Rayonnages', 340, 'background:var(--surface2);background-image:repeating-linear-gradient(90deg,color-mix(in srgb,var(--coin) 34%,transparent) 0 5px,transparent 5px 9px,color-mix(in srgb,var(--hist) 26%,transparent) 9px 13px,transparent 13px 18px)');
B('ba-etoiles', 'Douze étoiles', 420, 'background:radial-gradient(circle at 50% 50%,color-mix(in srgb,#1D3D8F 60%,var(--surface)),color-mix(in srgb,#1D3D8F 34%,var(--surface)));background-image:radial-gradient(circle at 50% 50%,transparent 34%,transparent 35%)');
B('ba-parchemin', 'Parchemin brûlé', 520, 'background:radial-gradient(ellipse at 30% 20%,color-mix(in srgb,#C08A3E 32%,var(--surface)),var(--surface2) 70%);background-image:repeating-linear-gradient(12deg,color-mix(in srgb,#8A5A2B 12%,transparent) 0 2px,transparent 2px 9px)');
B('ba-nuit', 'Nuit d’encre', 620, 'background:linear-gradient(160deg,#0B1220,#1B2E4A 55%,#2C5F8A);');
B('ba-delta', 'Delta', 950, 'background:linear-gradient(115deg,#C2410C,#CA8A04 42%,#0EA5A5);');

/* ---------------- CADRES ---------------- */
C('ca-simple', 'Trait simple', 0, 'border:2px solid var(--line)');
C('ca-double', 'Double filet', 160, 'border:3px double var(--brand)');
C('ca-pointille', 'Pointillé de carte', 200, 'border:2px dashed var(--geo)');
C('ca-laiton', 'Laiton', 320, 'border:3px solid var(--coin);box-shadow:0 0 0 2px color-mix(in srgb,var(--coin) 30%,transparent)');
C('ca-boussole', 'Rose des vents', 420, 'border:3px solid var(--brand);box-shadow:0 0 0 2px var(--surface),0 0 0 5px color-mix(in srgb,var(--brand) 40%,transparent)');
C('ca-tricolore', 'Tricolore', 520, 'border:3px solid transparent;background-image:linear-gradient(var(--surface),var(--surface)),linear-gradient(90deg,#1D3D8F,#FFFFFF,#B32020);background-origin:border-box;background-clip:padding-box,border-box');
C('ca-delta', 'Delta', 900, 'border:3px solid transparent;background-image:linear-gradient(var(--surface),var(--surface)),linear-gradient(115deg,#C2410C,#CA8A04,#0EA5A5);background-origin:border-box;background-clip:padding-box,border-box;box-shadow:0 0 14px -2px color-mix(in srgb,#CA8A04 60%,transparent)');

/* ---------------- TITRES ---------------- */
TI('ti-debut', 'Élève de 3ᵉ', 0);
TI('ti-lecteur', 'Lecteur de cartes', 120);
TI('ti-chrono', 'Maître du chronomètre', 180);
TI('ti-archiviste', 'Archiviste appliqué', 220);
TI('ti-arpenteur', 'Arpenteur de territoires', 280);
TI('ti-temoin', 'Témoin du siècle', 340);
TI('ti-croquis', 'As du croquis', 400);
TI('ti-citoyen', 'Citoyen éclairé', 460);
TI('ti-memoire', 'Gardien de la mémoire', 560);
TI('ti-cartographe', 'Cartographe royal', 680);
TI('ti-chroniqueur', 'Chroniqueur du monde', 800);
TI('ti-delta', 'Lauréat Delta', 1200);

/* ---------------- FONDS DE PROFIL ---------------- */
D('do-quadrille', 'Quadrillé', 0, 'background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:16px 16px');
D('do-latitudes', 'Latitudes', 150, 'background-image:repeating-linear-gradient(0deg,color-mix(in srgb,var(--brand) 16%,transparent) 0 1px,transparent 1px 22px)');
D('do-hachures', 'Hachures', 190, 'background-image:repeating-linear-gradient(45deg,color-mix(in srgb,var(--hist) 14%,transparent) 0 2px,transparent 2px 10px)');
D('do-points', 'Semis de points', 240, 'background-image:radial-gradient(color-mix(in srgb,var(--geo) 30%,transparent) 1.4px,transparent 1.4px);background-size:14px 14px');
D('do-vagues', 'Vagues', 300, 'background-image:repeating-radial-gradient(circle at 0 100%,transparent 0 14px,color-mix(in srgb,var(--brand) 18%,transparent) 14px 15px)');
D('do-parchemin', 'Fibres de parchemin', 380, 'background-image:repeating-linear-gradient(100deg,color-mix(in srgb,var(--coin) 12%,transparent) 0 1px,transparent 1px 7px),repeating-linear-gradient(8deg,color-mix(in srgb,var(--coin) 9%,transparent) 0 1px,transparent 1px 11px)');
D('do-triangul', 'Triangulation', 540, 'background-image:repeating-linear-gradient(60deg,color-mix(in srgb,var(--coin) 16%,transparent) 0 1px,transparent 1px 24px),repeating-linear-gradient(-60deg,color-mix(in srgb,var(--coin) 16%,transparent) 0 1px,transparent 1px 24px)');

const SHOPCATS = [
  ['theme', 'Thèmes', 'Repeignent toute l’interface, en clair comme en sombre.'],
  ['avatar', 'Avatars', 'Le dessin de ton profil.'],
  ['banner', 'Bannières', 'Le bandeau derrière ta carte de profil.'],
  ['frame', 'Cadres', 'L’encadrement de ton avatar.'],
  ['title', 'Titres', 'La ligne affichée sous ton pseudo.'],
  ['back', 'Fonds', 'Le motif de la carte de profil.']
];
const shopFind = (cat, id) => (SHOP[cat] || []).find(x => x.id === id);

/* ============================================================
   SUCCES
   ============================================================ */
const SUCCES = [
  { id: 's-premier', n: 'Premier pas', d: 'Terminer un premier chapitre de cours.', i: '▤', f: s => Object.keys(s.cours).length >= 1, r: 40 },
  { id: 's-dix', n: 'Bon élève', d: 'Terminer 10 chapitres.', i: '▤', f: s => Object.keys(s.cours).length >= 10, r: 120 },
  { id: 's-vingt', n: 'Assidu', d: 'Terminer 20 chapitres.', i: '▤', f: s => Object.keys(s.cours).length >= 20, r: 220 },
  { id: 's-tout', n: 'Programme bouclé', d: 'Terminer les 45 chapitres.', i: '★', f: s => Object.keys(s.cours).length >= 45, r: 900 },
  { id: 's-hist', n: 'Historien', d: 'Terminer tous les chapitres d’histoire.', i: '◆', f: s => COURS.filter(c => c.m === 'hist').every(c => s.cours[c.id]), r: 400 },
  { id: 's-geo', n: 'Géographe', d: 'Terminer tous les chapitres de géographie.', i: '◉', f: s => COURS.filter(c => c.m === 'geo').every(c => s.cours[c.id]), r: 400 },
  { id: 's-emc', n: 'Citoyen', d: 'Terminer tous les chapitres d’EMC.', i: '⚖', f: s => COURS.filter(c => c.m === 'emc').every(c => s.cours[c.id]), r: 400 },

  { id: 'x-dix', n: 'Échauffement', d: 'Réussir 10 exercices.', i: '✎', f: s => s.stats.exoOk >= 10, r: 50 },
  { id: 'x-cinquante', n: 'Entraînement sérieux', d: 'Réussir 50 exercices.', i: '✎', f: s => s.stats.exoOk >= 50, r: 160 },
  { id: 'x-cent', n: 'Machine à réviser', d: 'Réussir 100 exercices.', i: '✎', f: s => s.stats.exoOk >= 100, r: 340 },
  { id: 'x-tous', n: 'Sans exception', d: 'Réussir tous les exercices au moins une fois.', i: '★', f: s => EXOS.every(e => s.exos[e.id] && s.exos[e.id].ok), r: 800 },
  { id: 'x-precis', n: 'Précision', d: 'Atteindre 80 % de réussite sur au moins 40 exercices.', i: '◎', f: s => s.stats.exoTot >= 40 && s.stats.exoOk / s.stats.exoTot >= .8, r: 260 },

  { id: 'j-un', n: 'Première partie', d: 'Terminer un mini-jeu.', i: '◈', f: s => s.stats.jeux >= 1, r: 40 },
  { id: 'j-dix', n: 'Joueur régulier', d: 'Terminer 10 parties.', i: '◈', f: s => s.stats.jeux >= 10, r: 130 },
  { id: 'j-cinquante', n: 'Accro aux mini-jeux', d: 'Terminer 50 parties.', i: '◈', f: s => s.stats.jeux >= 50, r: 380 },
  { id: 'j-tous', n: 'Touche-à-tout', d: 'Jouer au moins une fois à chaque mini-jeu.', i: '◈', f: s => JEUX.every(j => s.games[j.id]), r: 320 },
  { id: 'j-parfait', n: 'Sans faute', d: 'Terminer un mini-jeu sans aucune erreur.', i: '★', f: s => Object.keys(s.games).some(k => s.games[k].parfait), r: 300 },

  { id: 'b-un', n: 'Baptême du feu', d: 'Terminer un brevet blanc.', i: '⏱', f: s => s.brevets.length >= 1, r: 150 },
  { id: 'b-tous', n: 'Toutes les annales', d: 'Terminer les 4 brevets blancs.', i: '⏱', f: s => new Set(s.brevets.map(b => b.id)).size >= 4, r: 600 },
  { id: 'b-30', n: 'Admis', d: 'Obtenir au moins 30/50 à un brevet blanc.', i: '✓', f: s => s.brevets.some(b => b.note >= 30), r: 250 },
  { id: 'b-40', n: 'Mention', d: 'Obtenir au moins 40/50 à un brevet blanc.', i: '★', f: s => s.brevets.some(b => b.note >= 40), r: 500 },
  { id: 'b-45', n: 'Presque parfait', d: 'Obtenir au moins 45/50 à un brevet blanc.', i: '★', f: s => s.brevets.some(b => b.note >= 45), r: 800 },

  { id: 'c-dix', n: 'Collectionneur', d: 'Débloquer 10 fiches de collection.', i: '▦', f: s => Object.keys(s.cards).length >= 10, r: 90 },
  { id: 'c-trente', n: 'Belle collection', d: 'Débloquer 30 fiches.', i: '▦', f: s => Object.keys(s.cards).length >= 30, r: 280 },
  { id: 'c-tout', n: 'Collection complète', d: 'Débloquer les 47 fiches.', i: '★', f: s => Object.keys(s.cards).length >= CARTES.length, r: 1200 },
  { id: 'c-leg', n: 'Légende', d: 'Obtenir une fiche de rareté Légende.', i: '✦', f: s => CARTES.some(c => c.r === 'leg' && s.cards[c.id]), r: 300 },
  { id: 'c-delta', n: 'Fiche Delta', d: 'Obtenir une fiche de rareté Delta.', i: '✦', f: s => CARTES.some(c => c.r === 'del' && s.cards[c.id]), r: 900 },
  { id: 'c-cent', n: 'Cent tirages', d: 'Effectuer 100 tirages.', i: '◉', f: s => s.rolls >= 100, r: 350 },

  { id: 'r-1000', n: 'Millier', d: 'Atteindre 1000 points Elo.', i: '⌖', f: s => s.eloPeak >= 1000, r: 120 },
  { id: 'r-1200', n: 'Chroniqueur', d: 'Atteindre 1200 points Elo.', i: '⌖', f: s => s.eloPeak >= 1200, r: 260 },
  { id: 'r-1400', n: 'Géographe confirmé', d: 'Atteindre 1400 points Elo.', i: '⌖', f: s => s.eloPeak >= 1400, r: 450 },
  { id: 'r-1650', n: 'Lauréat Delta', d: 'Atteindre 1650 points Elo.', i: '★', f: s => s.eloPeak >= 1650, r: 1000 },

  { id: 'v-niv10', n: 'Niveau 10', d: 'Atteindre le niveau 10.', i: '▲', f: s => levelOf(s.xp) >= 10, r: 200 },
  { id: 'v-niv25', n: 'Niveau 25', d: 'Atteindre le niveau 25.', i: '▲', f: s => levelOf(s.xp) >= 25, r: 600 },
  { id: 'v-serie3', n: 'Trois jours', d: 'Réviser 3 jours d’affilée.', i: '☀', f: s => (s.streak.best || 0) >= 3, r: 100 },
  { id: 'v-serie7', n: 'Une semaine', d: 'Réviser 7 jours d’affilée.', i: '☀', f: s => (s.streak.best || 0) >= 7, r: 300 },
  { id: 'v-serie30', n: 'Un mois entier', d: 'Réviser 30 jours d’affilée.', i: '★', f: s => (s.streak.best || 0) >= 30, r: 1000 },
  { id: 'v-riche', n: 'Trésorier', d: 'Posséder 2 000 δ en même temps.', i: '◆', f: s => s.coins >= 2000, r: 200 },
  { id: 'v-shop', n: 'Bon goût', d: 'Posséder 10 objets de la boutique.', i: '✦', f: s => s.shop.owned.length >= 10, r: 220 },
  { id: 'v-themes', n: 'Décorateur', d: 'Posséder 4 thèmes.', i: '✦', f: s => s.shop.owned.filter(o => o.indexOf('th-') === 0).length >= 4, r: 320 },
  { id: 'v-reperes', n: 'Repères en tête', d: 'Valider 30 repères chronologiques.', i: '⌖', f: s => Object.keys(s.reperes || {}).length >= 30, r: 260 }
];

function checkSucces() {
  if (!S) return;
  SUCCES.forEach(a => {
    if (S.succes[a.id]) return;
    let ok = false;
    try { ok = a.f(S); } catch (e) { ok = false; }
    if (ok) {
      S.succes[a.id] = Date.now();
      S.coins += a.r; commit(); paintBar();
      setTimeout(() => { toast('Succès : ' + a.n + ' (+' + a.r + ' δ)', 'win'); burstAt(innerWidth / 2, 150, 40); }, 320);
    }
  });
}
