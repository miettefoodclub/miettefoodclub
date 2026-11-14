
(function(){
"use strict";
const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
const store = {get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

/* ---------- Icônes ---------- */
const I = {
 plate:'<circle cx="32" cy="32" r="17"/><circle cx="32" cy="32" r="10"/><path d="M7 12v10a3 3 0 0 0 6 0V12M10 25v27M57 12c-4 3-5 9-5 15h5v25"/>',
 glass:'<path d="M22 8h20c0 15-4 22-10 22S22 23 22 8zM23 16h18M32 30v20M24 54h16"/>',
 fish:'<path d="M8 32c9-13 27-15 39 0-12 15-30 13-39 0z"/><path d="M47 32l10-9v18z"/><circle cx="19" cy="30" r="2" fill="currentColor"/><path d="M28 24c3 5 3 11 0 16"/>',
 oyster:'<path d="M9 37c4-15 17-23 27-21 11 2 19 11 19 19-4 11-17 15-29 13-8-1-15-5-17-11z"/><path d="M17 39c6-6 15-10 27-10M21 45c6-4 15-6 25-6"/><circle cx="34" cy="34" r="3" fill="currentColor"/>',
 pizza:'<path d="M32 7l22 44c-14 7-30 7-44 0z"/><path d="M14 44c11 5 25 5 36 0"/><circle cx="32" cy="25" r="3"/><circle cx="26" cy="36" r="3"/><circle cx="38" cy="38" r="3"/>',
 crepe:'<path d="M7 40c10-16 40-16 50 0-10 9-40 9-50 0z"/><path d="M7 40l25-12 25 12"/><path d="M22 22c0-4 4-4 4-8M38 22c0-4 4-4 4-8"/>',
 tart:'<path d="M9 45l37-22 9 22z"/><path d="M9 45h46v6H9z"/><circle cx="40" cy="20" r="4"/><path d="M41 16c1-4 4-6 7-6"/>',
 terrace:'<path d="M9 27c6-13 40-13 46 0z"/><path d="M32 27v27M22 54h20M17 41h30"/>',
 bowl:'<path d="M9 30h46c0 14-10 22-23 22S9 44 9 30z"/><path d="M24 22c0-4 4-4 4-8M34 22c0-4 4-4 4-8"/>',
 gift:'<path d="M10 26h44v10H10zM14 36h36v20H14zM32 26v30"/><path d="M32 26c-4-10-16-12-16-4 0 4 8 4 16 4zM32 26c4-10 16-12 16-4 0 4-8 4-16 4z"/>',
 truck:'<path d="M5 20h33v24H5zM38 27h11l9 10v7H38z"/><path d="M9 20l4-7h22l4 7"/><path d="M11 26h21v8H11z"/><circle cx="15" cy="46" r="5" fill="currentColor"/><circle cx="48" cy="46" r="5" fill="currentColor"/>',
 cup:'<path d="M13 26h30v12a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12z"/><path d="M43 30h4a6 6 0 0 1 0 12h-5"/><path d="M23 18c0-4 4-4 4-8M31 18c0-4 4-4 4-8"/>'
};
const svg = (k,sw=2.6)=>`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const ic = {
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12l5 5L20 6"/></svg>',
 cross:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 left:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
 right:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
 shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
 search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4M9.5 14.5l5 4M14.5 14.5l-5 4"/></svg>'
};
const LOGO = `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="#ffca26"/><path d="M10 31l22-13 6 13z" fill="#f76116"/><path d="M10 31h28v4H10z" fill="#b9440a"/><circle cx="34" cy="15" r="3" fill="#b9440a"/><circle cx="14" cy="38" r="1.3" fill="#b9440a"/><circle cx="19" cy="40" r="1" fill="#b9440a"/><circle cx="36" cy="39" r="1.2" fill="#b9440a"/></svg>`;

/* ---------- Données ---------- */
const TEST = {spots:15, taken:0}; // offre de lancement : places prises à mettre à jour
const PLANS = {
 essentiel:{key:"essentiel",name:"Miette Essentiel",short:"Essentiel",price:"34,90",photos:4,links:false,carousel:false,updates:2},
 visibilite:{key:"visibilite",name:"Miette Visibilité",short:"Visibilité",price:"49,90",photos:6,links:true,carousel:false,updates:4},
 premium:{key:"premium",name:"Miette Premium",short:"Premium",price:"79,90",photos:8,links:true,carousel:true,updates:12}
};
const EQUIP = {terrasse:"Terrasse",pmr:"Accessible PMR",animaux:"Animaux acceptés",enfant:"Menu enfant",vege:"Végétarien",resa:"Réservation",parking:"Parking à proximité"};
const COMMUNES = ["Arces","Arvert","Barzan","Boutenac-Touvent","Breuillet","Brie-sous-Mortagne","Chaillevette","Le Chay","Chenac-Saint-Seurin-d'Uzet","Corme-Écluse","Cozes","L'Éguille","Épargnes","Étaules","Floirac","Grézac","Les Mathes","Médis","Meschers-sur-Gironde","Mornac-sur-Seudre","Mortagne-sur-Gironde","Royan","Sablonceaux","Saint-Augustin","Saint-Georges-de-Didonne","Saint-Palais-sur-Mer","Saint-Romain-de-Benet","Saint-Sulpice-de-Royan","Saujon","Semussac","Talmont-sur-Gironde","La Tremblade","Vaux-sur-Mer"];
const STATIONS = {"la palmyre":"Les Mathes","ronce-les-bains":"La Tremblade","ronce":"La Tremblade","pontaillac":"Royan","nauzan":"Vaux-sur-Mer","suzac":"Saint-Georges-de-Didonne"};
const H = (a,b)=>[a,b]; // couleurs des visuels de remplacement
const HOURS = {
 a:["Fermé","12h–14h · 19h–22h","12h–14h · 19h–22h","12h–14h · 19h–22h","12h–14h · 19h–22h30","12h–14h30 · 19h–22h30","12h–15h"],
 b:["12h–14h","12h–14h","Fermé","12h–14h · 19h–21h30","12h–14h · 19h–21h30","12h–14h · 19h–22h","12h–14h · 19h–22h"],
 c:["11h–23h","11h–23h","11h–23h","11h–23h","11h–23h30","11h–23h30","11h–23h"],
 d:["12h–14h","12h–14h","12h–14h","12h–14h","12h–14h · 19h–21h","19h–21h30","Fermé"]
};
const R = [
 {slug:"la-maree-haute",name:"La Marée Haute",commune:"Royan",station:"Front de mer",addr:"14 boulevard de la Plage, 17200 Royan",lat:45.6235,lng:-1.022,cuisine:"Poissons & fruits de mer",price:[28,45],plan:"premium",offre:true,phone:"05 46 00 00 01",hours:HOURS.a,web:"lamareehaute-royan.fr",ig:"@lamareehaute",fb:"La Marée Haute Royan",resa:true,verified:"24/09/2026",equip:["terrasse","pmr","vege","resa"],kinds:["fish","oyster","glass","plate","terrace","tart","bowl","cup"],col:H("#ffd9a8","#ff9a5c"),
  desc:"Face à la Grande Conche, une cuisine de la marée qui suit l'arrivage des bateaux de Royan : plateaux d'huîtres de Marennes-Oléron, poisson du jour à la plancha et desserts maison.",
  menu:{font:"Georgia, 'Times New Roman', serif",bg:"#f3f7f8",fg:"#16323a",acc:"#1d5c6b",sections:[["Entrées",[["6 huîtres de Marennes-Oléron n°3","13 €"],["Sardines marinées, pickles d'oignon","11 €"],["Velouté de potimarron, croûtons","9 €"]]],["Plats",[["Poisson du jour à la plancha","24 €"],["Moules de bouchot, frites maison","17 €"],["Risotto aux coques et persil","21 €"]]],["Desserts",[["Tarte fine aux pommes","8 €"],["Île flottante au caramel beurre salé","8 €"]]]]}},
 {slug:"le-comptoir-des-conches",name:"Le Comptoir des Conches",commune:"Saint-Palais-sur-Mer",station:"Conche du Platin",addr:"3 avenue de Courlay, 17420 Saint-Palais-sur-Mer",lat:45.648,lng:-1.087,cuisine:"Bistronomique",price:[32,50],plan:"premium",offre:true,phone:"05 46 00 00 02",hours:HOURS.b,web:"comptoirdesconches.fr",ig:"@comptoirdesconches",fb:"Le Comptoir des Conches",resa:true,verified:"02/10/2026",equip:["terrasse","resa","parking","vege"],kinds:["plate","glass","tart","bowl","fish","cup","terrace","oyster"],col:H("#ffe7a3","#f7a14a"),
  desc:"Un bistrot de chef à deux pas de la conche du Platin. Menu court qui change avec les saisons, produits de Charente-Maritime et belle carte de vins de Loire.",
  menu:{font:"'Trebuchet MS', 'Gill Sans', sans-serif",bg:"#1f1f1f",fg:"#f3ece1",acc:"#e7b74f",sections:[["Menu du marché · 34 €",[["Œuf parfait, crème de cèpes","—"],["Merlu de ligne, beurre blanc au pineau","—"],["Chou à la crème, praliné noisette","—"]]],["À la carte",[["Tartare de bœuf charentais au couteau","23 €"],["Seiche en persillade, riz noir","22 €"],["Assiette de fromages affinés","10 €"]]]]}},
 {slug:"lecluse-gourmande",name:"L'Écluse Gourmande",commune:"Mornac-sur-Seudre",station:"Port de Mornac",addr:"Quai du Port, 17113 Mornac-sur-Seudre",lat:45.7105,lng:-1.026,cuisine:"Cabane à huîtres",price:[20,35],plan:"premium",offre:false,phone:"05 46 00 00 03",hours:HOURS.c,web:"ecluse-gourmande.fr",ig:"@ecluse.gourmande",fb:"",resa:false,verified:"15/09/2026",equip:["terrasse","animaux","parking"],kinds:["oyster","glass","fish","terrace","bowl","plate","cup","tart"],col:H("#cfe6e4","#7fc0b6"),
  desc:"Dégustation d'huîtres de la Seudre au bord du chenal, dans l'un des plus beaux villages de France. Ambiance cabane, pieds dans le port.",
  menu:{font:"'Courier New', Courier, monospace",bg:"#fbf6ea",fg:"#2a2a2a",acc:"#8a5a2b",sections:[["Les huîtres",[["6 spéciales de claire","12 €"],["12 fines de claire","19 €"],["Assiette du parqueur (huîtres, crevettes, pain beurré)","22 €"]]],["À côté",[["Pâté de la cabane","7 €"],["Crevettes grises","9 €"],["Verre de blanc de pays","4 €"]]]]}},
 {slug:"le-petit-phare",name:"Le Petit Phare",commune:"La Tremblade",station:"Ronce-les-Bains",addr:"22 avenue de la Cèpe, 17390 La Tremblade",lat:45.792,lng:-1.153,cuisine:"Poissons & grillades",price:[22,38],plan:"premium",offre:true,phone:"05 46 00 00 04",hours:HOURS.a,web:"lepetitphare-ronce.fr",ig:"@petitphare.ronce",fb:"Le Petit Phare Ronce",resa:true,verified:"30/09/2026",equip:["terrasse","enfant","pmr","resa","animaux"],kinds:["fish","terrace","plate","glass","bowl","cup","tart","oyster"],col:H("#ffd0b0","#f76116"),
  desc:"À Ronce-les-Bains, en lisière de forêt, une adresse familiale : grillades au feu de bois, poissons entiers et menu enfant avec glace artisanale.",
  menu:{font:"Georgia, serif",bg:"#fff7ee",fg:"#3a1d10",acc:"#d1491a",sections:[["Au feu de bois",[["Dorade entière, légumes grillés","22 €"],["Entrecôte 300 g, frites","24 €"],["Brochette de gambas","21 €"]]],["Pour les petits",[["Menu enfant (plat, boisson, glace)","11 €"]]],["Douceurs",[["Glace artisanale, 2 boules","6 €"],["Fondant chocolat","8 €"]]]]}},
 {slug:"sole-mio",name:"Pizzeria Sole Mio",commune:"Les Mathes",station:"La Palmyre",addr:"8 avenue de l'Océan, 17570 Les Mathes",lat:45.689,lng:-1.182,cuisine:"Pizzeria",price:[14,24],plan:"visibilite",offre:true,phone:"05 46 00 00 05",hours:HOURS.c,web:"solemio-lapalmyre.fr",ig:"@solemio.palmyre",fb:"Sole Mio La Palmyre",resa:false,verified:"10/09/2026",equip:["terrasse","enfant","vege","animaux"],kinds:["pizza","glass","terrace","bowl","tart","cup"],col:H("#ffe1a8","#ffb347"),
  desc:"Pâte maturée 48 heures et four à bois au cœur de La Palmyre, à cinq minutes du zoo. Pizzas à emporter ou en terrasse.",
  menu:{font:"'Trebuchet MS', sans-serif",bg:"#fffaf0",fg:"#1e3b22",acc:"#c0392b",sections:[["Pizze rosse",[["Margherita","11 €"],["Regina","13 €"],["Diavola","14 €"]]],["Pizze bianche",[["Quattro formaggi","14 €"],["Végétarienne du marché","13 €"]]],["Dolci",[["Tiramisù maison","7 €"]]]]}},
 {slug:"le-jardin-de-saujon",name:"Le Jardin de Saujon",commune:"Saujon",station:"",addr:"5 rue du Port, 17600 Saujon",lat:45.6735,lng:-0.927,cuisine:"Cuisine du marché",price:[18,30],plan:"visibilite",offre:false,phone:"05 46 00 00 06",hours:HOURS.d,web:"lejardin-saujon.fr",ig:"@lejardin.saujon",fb:"",resa:true,verified:"18/09/2026",equip:["vege","pmr","resa","parking","enfant"],kinds:["bowl","plate","cup","tart","glass","terrace"],col:H("#e4f2c8","#a8cf6b"),
  desc:"Une cuisine de saison végétale et généreuse, avec des légumes de maraîchers de la Seudre. Formule du midi en semaine.",
  menu:{font:"'Gill Sans', 'Trebuchet MS', sans-serif",bg:"#f4f8ec",fg:"#2c3a1f",acc:"#5b7f2a",sections:[["Formule du midi",[["Entrée + plat ou plat + dessert","17 €"],["Entrée + plat + dessert","21 €"]]],["La carte",[["Assiette végétale du jardin","16 €"],["Volaille fermière, jus au thym","19 €"],["Crumble de saison","7 €"]]]]}},
 {slug:"creperie-ty-vent",name:"Crêperie Ty Vent",commune:"Meschers-sur-Gironde",station:"Grottes de Régulus",addr:"2 rue des Grottes, 17132 Meschers-sur-Gironde",lat:45.558,lng:-0.95,cuisine:"Crêperie",price:[12,22],plan:"visibilite",offre:true,phone:"05 46 00 00 07",hours:HOURS.b,web:"",ig:"@tyvent.meschers",fb:"Crêperie Ty Vent",resa:false,verified:"05/10/2026",equip:["terrasse","enfant","vege","animaux"],kinds:["crepe","cup","glass","terrace","tart","bowl"],col:H("#ffeec2","#e9b872"),
  desc:"Galettes de sarrasin et crêpes au caramel beurre salé, avec vue sur l'estuaire, à deux pas des grottes de Régulus.",
  menu:{font:"Georgia, serif",bg:"#fffaf2",fg:"#3b2412",acc:"#2e5aa8",sections:[["Galettes",[["Complète (jambon, œuf, emmental)","10 €"],["Paysanne (lardons, pommes de terre, crème)","12 €"],["Chèvre, miel, noix","11 €"]]],["Crêpes",[["Caramel beurre salé maison","6 €"],["Pommes flambées au cognac","8 €"]]],["Boissons",[["Bolée de cidre","4 €"]]]]}},
 {slug:"le-belvedere-de-talmont",name:"Le Belvédère",commune:"Talmont-sur-Gironde",station:"",addr:"1 rue de l'Église, 17120 Talmont-sur-Gironde",lat:45.5365,lng:-0.905,cuisine:"Cuisine française",price:[25,40],plan:"essentiel",offre:false,phone:"05 46 00 00 08",hours:HOURS.a,web:"lebelvedere-talmont.fr",ig:"@belvedere.talmont",fb:"",resa:true,verified:"12/09/2026",equip:["terrasse","resa"],kinds:["plate","glass","tart","fish"],col:H("#f6dcc8","#d9a07a"),
  desc:"Cuisine française traditionnelle au pied de l'église Sainte-Radegonde, dans le village fleuri de Talmont.",
  menu:{font:"'Palatino Linotype', Palatino, serif",bg:"#fdf8f1",fg:"#3a2a1f",acc:"#7a3b2e",sections:[["Menu du terroir · 29 €",[["Terrine maison, chutney de figues","—"],["Mouclade charentaise","—"],["Tarte aux fruits de saison","—"]]],["À la carte",[["Magret de canard, sauce au pineau","22 €"],["Filet de maigre, beurre citronné","23 €"]]]]}},
 {slug:"chez-ninon",name:"Chez Ninon",commune:"Saint-Georges-de-Didonne",station:"Plage de Saint-Georges",addr:"40 boulevard de la Côte de Beauté, 17110 Saint-Georges-de-Didonne",lat:45.602,lng:-0.995,cuisine:"Brasserie",price:[16,28],plan:"essentiel",offre:true,phone:"05 46 00 00 09",hours:HOURS.c,web:"",ig:"",fb:"",resa:false,verified:"28/09/2026",equip:["terrasse","enfant","pmr","animaux"],kinds:["bowl","cup","plate","glass"],col:H("#ffe0c4","#f3a26b"),
  desc:"Brasserie de bord de plage ouverte toute la journée : moules-frites, salades composées, glaces et cafés en terrasse.",
  menu:{font:"Arial, Helvetica, sans-serif",bg:"#ffffff",fg:"#222222",acc:"#e2533b",sections:[["Brasserie",[["Moules marinières, frites","15 €"],["Salade océane","14 €"],["Burger charentais","16 €"]]],["Glaces & cafés",[["Coupe Ninon","8 €"],["Café gourmand","7 €"]]]]}}
];
const bySlug = Object.fromEntries(R.map(r=>[r.slug,r]));
const ADDED = {"la-maree-haute":"2026-09-02","le-comptoir-des-conches":"2026-10-14","lecluse-gourmande":"2026-09-20","le-petit-phare":"2026-10-08","sole-mio":"2026-10-17","le-jardin-de-saujon":"2026-09-11","creperie-ty-vent":"2026-10-02","le-belvedere-de-talmont":"2026-10-11","chez-ninon":"2026-09-26"};
R.forEach(r=>r.added=ADDED[r.slug]||"2026-09-01");
const PLACES = {"Royan":[45.624,-1.029],"Saint-Palais-sur-Mer":[45.648,-1.088],"Vaux-sur-Mer":[45.643,-1.059],"Saint-Georges-de-Didonne":[45.603,-0.999],"Meschers-sur-Gironde":[45.556,-0.946],"Talmont-sur-Gironde":[45.536,-0.903],"Mortagne-sur-Gironde":[45.477,-0.787],"Les Mathes":[45.715,-1.155],"La Palmyre":[45.689,-1.183],"La Tremblade":[45.768,-1.142],"Ronce-les-Bains":[45.792,-1.155],"Mornac-sur-Seudre":[45.711,-1.027],"Saujon":[45.673,-0.928],"Médis":[45.643,-0.964],"Cozes":[45.583,-0.832],"Arvert":[45.744,-1.126],"Étaules":[45.733,-1.099],"Breuillet":[45.692,-1.054],"Semussac":[45.600,-0.913],"Arces":[45.555,-0.860],"Barzan":[45.528,-0.866],"Boutenac-Touvent":[45.505,-0.776],"Brie-sous-Mortagne":[45.496,-0.749],"Chaillevette":[45.729,-1.058],"Le Chay":[45.637,-0.900],"Chenac-Saint-Seurin-d'Uzet":[45.502,-0.817],"Corme-Écluse":[45.630,-0.856],"L'Éguille":[45.703,-1.036],"Épargnes":[45.541,-0.800],"Floirac":[45.475,-0.756],"Grézac":[45.595,-0.858],"Sablonceaux":[45.713,-0.890],"Saint-Augustin":[45.680,-1.100],"Saint-Romain-de-Benet":[45.690,-0.845],"Saint-Sulpice-de-Royan":[45.672,-1.009],"La Rochelle":[46.160,-1.151],"Rochefort":[45.942,-0.958],"Saintes":[45.746,-0.633],"Marennes":[45.823,-1.106]};
const COMMUNE_DL=`<datalist id="dl-communes">${Object.keys(PLACES).filter(k=>!["La Palmyre","Ronce-les-Bains"].includes(k)).sort((a,b)=>a.localeCompare(b,"fr")).map(c=>`<option value="${c.replace(/"/g,"&quot;")}">`).join("")}</datalist>`;
function placeOf(name){if(!name)return null;const n=norm(name.trim());const k=Object.keys(PLACES).find(x=>norm(x)===n);return k?PLACES[k]:null;}
function km(a,b){const R0=6371,t=Math.PI/180,dl=(b[0]-a[0])*t,dg=(b[1]-a[1])*t;const h=Math.sin(dl/2)**2+Math.cos(a[0]*t)*Math.cos(b[0]*t)*Math.sin(dg/2)**2;return 2*R0*Math.asin(Math.sqrt(h));}
const fmtDate = d=>d.split("-").reverse().join("/");
/* moyens de paiement + fermetures */
const PAY = {titres:"Carte déjeuner / titres-restaurant",ancv:"Chèques-Vacances (ANCV)"};
const PAYDATA = {"la-maree-haute":["titres","ancv"],"le-comptoir-des-conches":["ancv"],"lecluse-gourmande":["titres"],"le-petit-phare":["titres","ancv"],"sole-mio":["titres"],"le-jardin-de-saujon":["titres","ancv"],"creperie-ty-vent":["titres","ancv"],"le-belvedere-de-talmont":["ancv"],"chez-ninon":["titres"]};
const isoD = d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const relD = n=>{const d=new Date();d.setDate(d.getDate()+n);return isoD(d);};
const TODAY_ISO = isoD(new Date());
const nextJan = (()=>{const y=new Date().getFullYear()+1;return [`${y}-01-05`,`${y}-01-30`];})();
const CLOSEDATA = {
  "chez-ninon":[{from:relD(-18),to:relD(130),label:"Fermeture saisonnière (hiver)"}],
  "le-belvedere-de-talmont":[{from:relD(12),to:relD(25),label:"Congés d'automne"}],
  "la-maree-haute":[{from:nextJan[0],to:nextJan[1],label:"Fermeture annuelle"}],
  "creperie-ty-vent":[{from:relD(48),to:relD(60),label:"Vacances de fin d'année"}]
};
R.forEach(r=>{r.pay=PAYDATA[r.slug]||[];r.closures=CLOSEDATA[r.slug]||[];});
const longDate = d=>new Date(d+"T12:00:00").toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"});
const dayAfter = d=>{const x=new Date(d+"T12:00:00");x.setDate(x.getDate()+1);return isoD(x);};
function closureState(r){
  const list=(r.closures||[]).filter(c=>c.to>=TODAY_ISO).sort((a,b)=>a.from.localeCompare(b.from));
  const now=list.find(c=>c.from<=TODAY_ISO)||null;
  const lim=relD(45);
  const next=list.find(c=>c.from>TODAY_ISO&&c.from<=lim)||null;
  return {now,next,list};
}
/* Lancement : annuaire vide. La fiche d'exemple reste visible pour les restaurateurs (non référencée). */
const EXAMPLE = R.find(r=>r.slug==="la-maree-haute");
EXAMPLE.slug="exemple"; EXAMPLE.example=true;
window.__miette={R,PLACES,EXAMPLE,svg}; /* lu par le pré-rendu (e-mail « nouveau restaurant ») */
R.splice(0,R.length);
Object.keys(bySlug).forEach(k=>delete bySlug[k]); bySlug.exemple=EXAMPLE;
const avg = r=>(r.price[0]+r.price[1])/2;
const budgetOf = r=> avg(r)<20?"€":avg(r)<=35?"€€":"€€€";
const CUISINES = [...new Set(R.map(r=>r.cuisine))].sort((a,b)=>a.localeCompare(b,"fr"));
const norm = s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");

/* ---------- Petits composants ---------- */
function ph(r,i,label){
  const k = r.kinds[i % r.kinds.length];
  return `<div class="ph" style="--a:${r.col[0]};--b:${r.col[1]}">${svg(k)}${label?`<span class="cap">${label}</span>`:""}</div>`;
}
const priceTxt = r=>`${r.price[0]} à ${r.price[1]} €`;
function badgeRow(r){
  let b = "";
  if(r.plan==="premium") b += `<span class="badge b-une" title="Mise en avant payante (forfait Premium)">★ À la une · annonce</span>`;
  if(r.offre) b += `<span class="badge b-offre"><span class="pastille"></span>Offre Miette</span>`;
  if(r.closures && closureState(r).now) b += `<span class="badge b-conges">En congés</span>`;
  return b;
}
function card(r,i){
  return `<a class="card rv ${i%3===1?"d1":i%3===2?"d2":""} ${r.plan==="premium"?"prem":""}" href="/restaurants/${r.slug}/">
    <div style="position:relative">${ph(r,0)}<div class="badges">${badgeRow(r)}</div></div>
    <div><h3>${r.name}</h3><p class="meta">${r.commune}${r.station?` · ${r.station}`:""}</p></div>
    <p class="meta">${r.cuisine} · <span class="price">${priceTxt(r)}</span></p>
    <div class="eq">${r.equip.slice(0,4).map(e=>`<span>${EQUIP[e]}</span>`).join("")}</div>
  </a>`;
}

/* carte géographique stylisée */
const P = (lat,lng)=>[ +((lng+1.25)*1000).toFixed(1), +((45.83-lat)*1430).toFixed(1) ];
const poly = pts=>pts.map(p=>P(p[0],p[1]).join(",")).join(" ");
const SEA_PTS = [[45.83,-1.25],[45.83,-1.20],[45.79,-1.172],[45.72,-1.22],[45.69,-1.245],[45.66,-1.172],[45.645,-1.102],[45.624,-1.042],[45.60,-1.012],[45.552,-0.962],[45.528,-0.912],[45.47,-0.795],[45.45,-0.765],[45.45,-0.86],[45.52,-0.98],[45.57,-1.06],[45.56,-1.25]];
const SEUDRE = [[45.83,-1.162],[45.775,-1.115],[45.732,-1.045],[45.725,-1.034],[45.76,-1.098],[45.80,-1.138],[45.83,-1.14]];
const TOWNS = [["Royan",45.635,-1.0],["La Tremblade",45.768,-1.135],["Les Mathes",45.715,-1.155],["Saujon",45.685,-0.93],["Meschers",45.572,-0.94],["Mortagne",45.49,-0.79],["Cozes",45.585,-0.832],["Médis",45.646,-0.965]];
function mapSVG(list,{focus=null,prefix="r-"}={}){
  const pins = list.map(r=>{const [x,y]=P(r.lat,r.lng);return `<a href="${prefix==="ft-"?"/foodtrucks/":"/restaurants/"}${r.slug}/" class="pin ${r.plan==="premium"?"prem":""}" aria-label="${r.name}, ${r.commune}"><circle cx="${x}" cy="${y}" r="${focus?10:8}"/>${(!focus)?`<text x="${x+12}" y="${y+4}">${r.name}</text>`:""}</a>`}).join("");
  let vb = "0 0 550 545";
  if(focus){const [x,y]=P(focus.lat,focus.lng);const w=260,h=200;vb=`${Math.max(0,Math.min(550-w,x-w/2))} ${Math.max(0,Math.min(545-h,y-h/2))} ${w} ${h}`;}
  return `<div class="map"><svg viewBox="${vb}" role="img" aria-label="Carte avec ${focus?"l'emplacement du restaurant":"les restaurants"}">
    <rect x="0" y="0" width="550" height="545" class="land"/>
    <polygon points="${poly(SEA_PTS)}" style="fill:var(--sea)"/><polygon points="${poly(SEUDRE)}" style="fill:var(--sea)"/>
    <text class="water-l" x="18" y="${focus?P(focus.lat,focus.lng)[1]+60:330}">Océan Atlantique</text>
    <text class="water-l" x="300" y="490" transform="rotate(32 300 490)">Estuaire de la Gironde</text>
    ${TOWNS.map(t=>{const [x,y]=P(t[1],t[2]);return `<text class="town" x="${x}" y="${y}">${t[0]}</text>`}).join("")}
    ${pins}</svg></div>`;
}

/* ---------- Pages ---------- */
/* À la une : restaurants ET foodtrucks Premium (calculé à l'affichage, FT est déclaré plus bas) */
const premiumList=()=>[...R.filter(r=>r.plan==="premium").map(r=>({...r,_ft:false})),...FT.filter(f=>f.plan==="premium").map(f=>({...f,_ft:true}))];

function homeCarousel(){
  const premiums=premiumList();
  const list=premiums.slice().sort(()=>Math.random()-.5);
  const fl=i=>`--fd:${(5+Math.random()*2.5).toFixed(2)}s;--fl:-${(Math.random()*6).toFixed(2)}s;--fy:${i%2?14:-10}px;--fr:${(Math.random()*2.4-1.2).toFixed(2)}deg`;
  return `
  <section class="fc-sec">
    <div class="wrap">
      <div class="sec-head">
        <div><p class="eyebrow">À la une · annonces</p><h2 class="rv">Les tables du moment</h2></div>
        <p class="fc-hint">bougez la souris pour parcourir <svg viewBox="0 0 44 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9h38M33 2l7 7-7 7"/></svg></p>
      </div>
    </div>
    <div class="fc-rail" id="fc-rail">
      <div class="fc-track" id="fc-track">
        ${list.map((r,i)=>{const st=r._ft?r.sched[todayIdx()]:null;return `<a class="fc-card" href="/${r._ft?"foodtrucks":"restaurants"}/${r.slug}/" style="${fl(i)}">
          <div class="fc-vis" style="--a:${r.col[0]};--b:${r.col[1]}"><span class="fc-num">${String(i+1).padStart(2,"0")}</span>${r.offre?`<span class="fc-badge"><i></i>Offre Miette</span>`:""}${r._ft?`<span class="fc-badge fc-ftb">Foodtruck</span>`:""}${svg(r._ft?r.kind:r.kinds[0])}</div>
          <div class="fc-txt"><h3>${r.name}</h3><p><span class="fc-ann" title="Mise en avant payante (forfait Premium)">Annonce</span><span>${r.cuisine}</span><span>${r._ft?(st?`Aujourd'hui : ${st.commune}`:"Voir son planning"):(r.station||r.commune)}</span><b>${r.price[0]} à ${r.price[1]} €</b></p><span class="fc-open">Ouvrir la fiche ${ic.arrow}</span></div></a>`}).join("")}
        <a class="fc-card fc-you" href="/partenaire/" style="${fl(list.length)}"><div class="fc-vis"><div><b>Votre restaurant ou foodtruck ici</b><p>${10-premiums.length} places Premium encore libres sur 10</p></div></div></a>
      </div>
      <div class="fc-bar"><i id="fc-bar"></i></div>
    </div>
    <div class="fc-cur" id="fc-cur" aria-hidden="true"><span>Ouvrir<br>la fiche<small>→</small></span></div>
  </section>`;
}
function homeLaunch(){
  return `
  <section>
    <div class="wrap">
      <div class="launch-home">
        <div class="lh-txt rv">
          <p class="eyebrow">Ouverture</p>
          <h2>Les premières tables arrivent</h2>
          <p class="muted" style="margin-top:10px">Miette ouvre ses portes en Charente-Maritime. Les premiers restaurants partenaires seront en ligne très bientôt, avec leur carte à jour et leurs horaires.</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><a class="btn btn-primary" href="/compte/">Créer mon compte gratuit</a><a class="btn btn-ghost" href="/restaurants/exemple/">Voir une fiche d'exemple</a></div>
        </div>
        <a class="lh-offer rv d1" href="/partenaire/#partenaire-lancement">
          <span class="lh-k">Restaurateurs</span>
          <b>2 mois offerts</b>
          <span>pour les ${TEST.spots} premiers restaurants partenaires</span>
          <span class="lh-go">Réserver ma place ${ic.arrow}</span>
        </a>
      </div>
    </div>
  </section>`;
}
/* ---------- Haut de l'accueil : le logo au centre, des fiches autour ---------- */
const SLOTS=[ // x,y en % de la scène, rotation, profondeur
  {x:3,y:6,r:-9,z:.75},{x:6,y:50,r:7,z:1},{x:-4,y:80,r:-4,z:.5},{x:83,y:3,r:8,z:.8},{x:86,y:44,r:-7,z:1},{x:77,y:76,r:5,z:.6},{x:29,y:-12,r:-3,z:.4},{x:56,y:88,r:-6,z:.65}];
const SHOW_POOL=()=>R.map(r=>({slug:r.slug,name:r.name,cuisine:r.cuisine,commune:r.commune,price:r.price,offre:r.offre,col:r.col,kind:r.kinds[0]}))
;
function stageCards(){
  // 8 fiches tirées au hasard, en évitant celles affichées à la visite précédente
  let last=[];try{last=JSON.parse(localStorage.getItem("miette-vitrine")||"[]")}catch(e){}
  const all=SHOW_POOL().sort(()=>Math.random()-.5);
  const fresh=all.filter(r=>!last.includes(r.name)),seen=all.filter(r=>last.includes(r.name));
  const pool=fresh.concat(seen).slice(0,SLOTS.length);
  try{localStorage.setItem("miette-vitrine",JSON.stringify(pool.map(r=>r.name)))}catch(e){}
  return SLOTS.map((sl,i)=>{const r=pool[i%pool.length];const rot=sl.r+(Math.random()*4-2);
    return `<a class="sc" href="/restaurants/${r.slug}/" tabindex="-1" style="--x:${sl.x}%;--y:${sl.y}%;--r:${rot.toFixed(1)}deg;--z:${sl.z};--d:${(i*.37).toFixed(2)}s;--i:${i}">
      <div class="sc-in"><div class="sc-ph" style="--a:${r.col[0]};--b:${r.col[1]}">${svg(r.kind)}${r.offre?`<span class="sc-of"><span class="pastille"></span>Offre Miette</span>`:""}</div>
      <div class="sc-tx"><b>${r.name}</b><span>${r.cuisine} · ${r.commune}</span><em>${r.price[0]} à ${r.price[1]} €</em></div></div></a>`;}).join("");
}
function classicHero(){
  return `
  <section class="hero" style="padding-block:56px 48px">
    <div class="wrap">
      <div>
        <h1 class="rv">Les restaurants de Charente-Maritime</h1>
        <p class="hero-sub rv d1">Où manger à<span class="rot-line"><span class="rot" id="rot"><span>Royan</span></span>&nbsp;?</span></p>
        <p class="lead rv d2">Les bonnes adresses de Charente-Maritime avec leur carte à jour, leurs horaires et ce qu'il faut savoir avant de réserver.</p>
        <form class="search rv d3" id="home-search" role="search">
          <label for="hs" class="sr">Rechercher un restaurant, une commune ou un type de cuisine</label>
          <input id="hs" type="search" placeholder="Une ville, une envie : huîtres, crêpes, Meschers…" autocomplete="off">
          <button class="btn btn-primary" type="submit">${ic.search}<span>Chercher</span></button>
        </form>
        <div class="quick rv d3">${["Royan","La Palmyre","Ronce-les-Bains","Huîtres","Pizzeria","Crêperie"].map(q=>`<button type="button" data-quick="${q}">${q}</button>`).join("")}</div>
      </div>
      <div class="hero-art rv d2" aria-hidden="true">
        <div class="plate"><div class="mascot"></div></div>
        <span class="sticker" style="top:10%;left:-4%">Cartes à jour</span>
        <span class="sticker s2 s-mid">L'annuaire des restaurateurs pour les clients</span>
        <span class="sticker" style="bottom:0;left:12%;background:var(--orange)">Zéro avis, que du concret</span>
      </div>
    </div>
  </section>
`;
}
function stageHTML(){
  return `<section class="stage" id="stage" aria-labelledby="stage-t">
    <div class="stage-cards" aria-hidden="true">${stageCards()}</div>
    <div class="stage-mid">
      <img class="stage-logo" src="/assets/logo-hero.webp" alt="Miette FoodClub" width="1100" height="350">
      <h1 id="stage-t">Les restaurants de Charente-Maritime</h1>
      <p class="hero-sub">Où manger à<span class="rot-line"><span class="rot" id="rot"><span>Royan</span></span>&nbsp;?</span></p>
      <form class="search" id="home-search" role="search">
        <label for="hs" class="sr">Rechercher un restaurant, une commune ou un type de cuisine</label>
        <input id="hs" type="search" placeholder="Une ville, une envie : huîtres, crêpes…" autocomplete="off">
        <button class="btn btn-primary" type="submit">${ic.search}<span>Chercher</span></button>
      </form>
      <div class="quick">${["Royan","La Palmyre","Huîtres","Crêperie"].map(q=>`<button type="button" data-quick="${q}">${q}</button>`).join("")}</div>
    </div>
    <div class="stage-ct" aria-hidden="true"><p>On dresse la table…</p><div class="st-num"><span id="st-n">0</span><small>%</small></div></div>
  </section>`;
}
function pageHome(){
  return `
  ${R.length>=8?stageHTML():classicHero()}

  ${premiumList().length?homeCarousel():homeLaunch()}

  <section style="padding-top:0">
    <div class="wrap duo">
      <article class="cli rv">
        <p class="eyebrow">Pour les gourmands</p>
        <h2>Trouvez la bonne table en deux minutes</h2>
        <ul>
          <li><span class="dot">1</span><span><b>Enfin une carte à jour… Et en ligne !</b><span class="lg-t">Chaque menu affiche sa date de vérification. Fini les prix de l'an dernier.</span><span class="sh-t">La date de vérification sur chaque menu.</span></span></li>
          <li><span class="dot">2</span><span><b>Des filtres qui servent</b><span class="lg-t">Commune, cuisine, budget, terrasse, accès PMR, chiens bienvenus, menu enfant…</span><span class="sh-t">Commune, cuisine, budget, terrasse…</span></span></li>
          <li><span class="dot">3</span><span><b>Offre Miette</b><span class="lg-t">Chez les restaurateurs avec le badge « Offre Miette », profitez d'un avantage directement sur place.</span><span class="sh-t">Un avantage sur place chez les partenaires.</span></span></li>
        </ul>
        <div><a class="btn btn-ghost" href="/annuaire/">Parcourir l'annuaire ${ic.arrow}</a></div>
      </article>
      <article class="pro rv d1">
        <p class="eyebrow">Pour les restaurateurs</p>
        <h2>Soyez la réponse quand on cherche où manger</h2>
        <ul>
          <li><span class="dot">1</span><span><b>Une fiche claire, bien référencée</b>Votre carte telle que vous l'avez dessinée, vos horaires, votre adresse sur la carte.</span></li>
          <li><span class="dot">2</span><span><b>On s'occupe de tout</b>Vous envoyez votre nouvelle carte par mail, on la met en ligne.</span></li>
          <li><span class="dot">3</span><span><b>Des résultats mesurés</b>Un rapport chaque trimestre : visites, appels, téléchargements du menu.</span></li>
        </ul>
        <p class="from">À partir de 34,90 € par mois</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-yellow" href="/partenaire/">Voir les forfaits ${ic.arrow}</a><a class="btn btn-ghost" href="/partenaire/#partenaire-contact">Nous contacter</a></div>
      </article>
    </div>
  </section>

  <section class="ft-teaser" aria-labelledby="ftt">
    <div class="wrap ft-teaser-in">
      <div><p class="ft-eyebrow">Les foodtrucks</p><h2 id="ftt">Les foodtrucks ont leur coin</h2><p>Où est le camion à burgers ce soir ? Quel jour passe la crêpe roulante sur le marché ? Un espace à part pour suivre les foodtrucks de Charente-Maritime, jour après jour.</p></div>
      <a class="btn btn-white" href="/foodtrucks/">Voir l'aperçu ${ic.arrow}</a>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="wrap">
      <div class="sec-head"><div><p class="eyebrow">Le principe</p><h2 class="rv">Un annuaire, pas un site d'avis</h2></div></div>
      <div class="points">
        ${R.length?`<div class="rv"><p class="big-num">${R.length}</p><h3>restaurant${R.length>1?"s":""} dans l'annuaire</h3><p class="muted">Ce compteur grandit à chaque nouveau restaurant partenaire, partout en Charente-Maritime.</p></div>`:`<div class="rv"><p class="big-num">33</p><h3>communes à explorer</h3><p class="muted">De Royan à Saujon, de La Tremblade à Mortagne : l'annuaire grandit à chaque nouveau restaurant partenaire.</p></div>`}
        <div class="rv d1"><p class="big-num">0</p><h3>note, 0 avis</h3><p class="muted">Pas de classement par étoiles. Vous voyez la carte, les prix, les photos et les équipements, et vous choisissez.</p></div>
        <div class="rv d2"><p class="big-num">1</p><h3>date de vérification</h3><p class="muted">Sur chaque fiche, « Carte vérifiée le… » vous dit quand le menu a été contrôlé pour la dernière fois.</p></div>
      </div>
    </div>
  </section>`;
}

/* état de l'annuaire */
const F = {q:"",commune:"",cuisine:"",budget:"",equip:new Set(),pay:new Set(),offre:false,view:"liste"};
function filtered(){
  let q = norm(F.q.trim());
  let stationCommune = STATIONS[q] || null;
  return R.filter(r=>{
    if(q){
      const hay = norm([r.name,r.commune,r.station,r.cuisine,r.desc,r.menu.sections.map(s=>s[1].map(i=>i[0]).join(" ")).join(" ")].join(" "));
      if(!(hay.includes(q) || (stationCommune && r.commune===stationCommune))) return false;
    }
    if(F.commune && r.commune!==F.commune) return false;
    if(F.cuisine && r.cuisine!==F.cuisine) return false;
    if(F.budget && budgetOf(r)!==F.budget) return false;
    for(const e of F.equip) if(!r.equip.includes(e)) return false;
    for(const e of F.pay) if(!r.pay.includes(e)) return false;
    if(F.offre && !r.offre) return false;
    return true;
  }).sort((a,b)=>(b.plan==="premium")-(a.plan==="premium") || a.name.localeCompare(b.name,"fr"));
}
function pageSoonDir(){
  return `
  <div class="wrap page-head">
    <p class="crumbs"><a href="/">Accueil</a> › Annuaire</p>
    <h1 class="rv">Les restaurants de la Charente-Maritime</h1>
    <p class="muted rv d1" style="margin-top:12px;max-width:40em">Miette ouvre ses portes : les premières adresses arrivent très bientôt, avec leur carte à jour, leurs horaires et tout ce qu'il faut savoir avant de réserver.</p>
  </div>
  ${dirFTStrip()?`<div class="wrap">${dirFTStrip()}</div>`:""}
  <div class="wrap">
    <div class="soon-box rv">
      <div class="plate solo" aria-hidden="true"><div class="mascot"></div></div>
      <div>
        <p class="eyebrow">Bientôt à table</p>
        <h2>Les premiers restaurants partenaires arrivent</h2>
        <p class="muted" style="margin-top:10px">Royan, La Palmyre, Saint-Palais, Meschers, Saujon… L'annuaire se remplit commune après commune. Créez votre compte Miette gratuit pour garder vos adresses en favoris et profiter de l'Offre Miette dès l'ouverture.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><a class="btn btn-primary" href="/compte/">Créer mon compte gratuit</a><a class="btn btn-ghost" href="/restaurants/exemple/">Voir une fiche d'exemple</a></div>
      </div>
    </div>
    <div class="launch-strip rv">
      <div><b>Vous êtes restaurateur ?</b><p>Les ${TEST.spots} premiers restaurants partenaires profitent de 2 mois offerts sur le forfait Miette Visibilité.</p></div>
      <a class="btn btn-yellow" href="/partenaire/#partenaire-lancement">Réserver ma place ${ic.arrow}</a>
    </div>
  </div>
  <div style="height:clamp(48px,7vw,88px)"></div>`;
}
function dirFTStrip(){
  const fts=FT.filter(f=>f.plan==="premium");
  if(!fts.length) return "";
  const d=todayIdx();
  return `<section class="dir-ft rv"><div class="dir-ft-head"><p class="eyebrow">À la une · foodtrucks (annonces)</p><a href="/foodtrucks/">Tous les foodtrucks ${ic.arrow}</a></div>
    <div class="dir-ft-row">${fts.map(f=>ftCard(f,d)).join("")}</div></section>`;
}
function pageDir(){
  if(!R.length) return pageSoonDir();
  return `
  <div class="wrap page-head">
    <p class="crumbs"><a href="/">Accueil</a> › Annuaire</p>
    <h1 class="rv">Les restaurants de la Charente-Maritime</h1>
    <p class="muted rv d1" style="margin-top:12px;max-width:40em">Cherchez par nom, commune, station ou envie. Toutes les fiches sont des établissements partenaires abonnés ; les fiches « À la une » (mise en avant payante) apparaissent en premier, puis les autres par ordre alphabétique. <a href="/classement/" style="text-decoration:underline">Comment fonctionne le classement</a></p>
  </div>
  <div class="wrap dir">
    <form class="filters collapsed" id="filters" onsubmit="return false">
      <div class="fhead"><h2>Filtres</h2><button type="button" class="ftoggle" id="ftoggle" aria-expanded="false">Afficher</button></div>
      <div class="fbody">
        <div class="fgroup"><label for="f-q">Recherche</label><input class="field" id="f-q" type="search" placeholder="La Palmyre, huîtres…" value="${F.q.replace(/"/g,"&quot;")}"></div>
        <div class="fgroup"><label for="f-commune">Commune</label><select class="field" id="f-commune"><option value="">Toutes les communes</option>${[...new Set(R.map(r=>r.commune))].sort((a,b)=>a.localeCompare(b,"fr")).map(c=>`<option ${F.commune===c?"selected":""}>${c}</option>`).join("")}</select></div>
        <div class="fgroup"><label for="f-cuisine">Type de cuisine</label><select class="field" id="f-cuisine"><option value="">Toutes les cuisines</option>${CUISINES.map(c=>`<option ${F.cuisine===c?"selected":""}>${c}</option>`).join("")}</select></div>
        <div class="fgroup"><span class="lbl">Budget par personne</span><div class="chips">${[["€","moins de 20 €"],["€€","20 à 35 €"],["€€€","plus de 35 €"]].map(b=>`<button type="button" class="chip" data-budget="${b[0]}" aria-pressed="${F.budget===b[0]}" title="${b[1]}">${b[0]} <span class="muted" style="font-size:.78rem">${b[1]}</span></button>`).join("")}</div></div>
        <div class="fgroup"><span class="lbl">Équipements</span><div class="chips">${Object.entries(EQUIP).map(([k,v])=>`<button type="button" class="chip" data-equip="${k}" aria-pressed="${F.equip.has(k)}">${v}</button>`).join("")}</div></div>
        <div class="fgroup"><span class="lbl">Paiement accepté</span><div class="chips">${Object.entries(PAY).map(([k,v])=>`<button type="button" class="chip" data-pay="${k}" aria-pressed="${F.pay.has(k)}">${v}</button>`).join("")}</div></div>
        <div class="fgroup"><span class="lbl">Offre partenaire</span><div class="chips"><button type="button" class="chip offre" id="f-offre" aria-pressed="${F.offre}"><span class="pastille"></span> Restaurants avec Offre Miette</button></div></div>
        <button type="button" class="reset" id="f-reset">Effacer les filtres</button>
      </div>
    </form>
    <div style="min-width:0">
      ${dirFTStrip()}
      <div class="res-bar"><p id="count" class="muted" aria-live="polite"></p>
        <div class="view-sw" role="group" aria-label="Affichage"><button type="button" data-view="liste" aria-pressed="${F.view==="liste"}">Liste</button><button type="button" data-view="carte" aria-pressed="${F.view==="carte"}">Carte</button></div></div>
      <div id="results"></div>
    </div>
  </div>`;
}
function renderResults(){
  const list = filtered();
  $("#count").textContent = `${list.length} restaurant${list.length>1?"s":""}${F.q?` pour « ${F.q} »`:""}`;
  const box = $("#results");
  if(!list.length){box.innerHTML = `<div class="empty"><h3>Aucun restaurant ne correspond</h3><p class="muted" style="margin-top:8px">Essayez une commune voisine ou retirez un filtre.</p><button class="btn btn-ghost" style="margin-top:16px" type="button" id="empty-reset">Effacer les filtres</button></div>`;$("#empty-reset").onclick=resetFilters;return;}
  box.innerHTML = F.view==="carte" ? mapSVG(list)+`<div class="grid" style="margin-top:22px">${list.map(card).join("")}</div>` : `<div class="grid">${list.map(card).join("")}</div>`;
  reveal(box);
}
function resetFilters(){F.q="";F.commune="";F.cuisine="";F.budget="";F.equip.clear();F.pay.clear();F.offre=false;render("annuaire",false);}
function bindDir(){
  const fq=$("#f-q"); let t;
  fq.addEventListener("input",()=>{clearTimeout(t);t=setTimeout(()=>{F.q=fq.value;renderResults()},150)});
  $("#f-commune").onchange=e=>{F.commune=e.target.value;renderResults()};
  $("#f-cuisine").onchange=e=>{F.cuisine=e.target.value;renderResults()};
  $$("[data-budget]").forEach(b=>b.onclick=()=>{F.budget=F.budget===b.dataset.budget?"":b.dataset.budget;$$("[data-budget]").forEach(x=>x.setAttribute("aria-pressed",F.budget===x.dataset.budget));renderResults()});
  $$("[data-equip]").forEach(b=>b.onclick=()=>{const k=b.dataset.equip;F.equip.has(k)?F.equip.delete(k):F.equip.add(k);b.setAttribute("aria-pressed",F.equip.has(k));renderResults()});
  $$("[data-pay]").forEach(b=>b.onclick=()=>{const k=b.dataset.pay;F.pay.has(k)?F.pay.delete(k):F.pay.add(k);b.setAttribute("aria-pressed",F.pay.has(k));renderResults()});
  $("#f-offre").onclick=e=>{F.offre=!F.offre;e.currentTarget.setAttribute("aria-pressed",F.offre);renderResults()};
  $$("[data-view]").forEach(b=>b.onclick=()=>{F.view=b.dataset.view;$$("[data-view]").forEach(x=>x.setAttribute("aria-pressed",F.view===x.dataset.view));renderResults()});
  $("#f-reset").onclick=resetFilters;
  $("#ftoggle").onclick=e=>{const f=$("#filters");const c=f.classList.toggle("collapsed");e.currentTarget.textContent=c?"Afficher":"Masquer";e.currentTarget.setAttribute("aria-expanded",!c)};
  renderResults();
}

/* fiche restaurant */
let demoPlan = null; // forfait simulé en mode démo
function pageResto(r){
  const plan = PLANS[(r.example && demoPlan) ? demoPlan : r.plan];
  const isP = plan.key==="premium";
  const today = (new Date().getDay()+6)%7;
  const days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
  const nPh = plan.photos;
  const labels = ["La salle","Plat signature","Terrasse","Dessert","En cuisine","Les vins","Le dressage","Vue"];
  let gal = "";
  for(let i=0;i<8;i++){
    if(i<nPh) gal += ph(r,i,`Photo ${i+1}/${nPh}`);
    else gal += `<div class="locked demo-only"><span><b>Photo ${i+1}</b>${i<6?"Dès Miette Visibilité":"Avec Miette Premium"}</span></div>`;
  }
  const links = [];
  if(r.web) links.push(["Site internet",r.web]);
  if(r.ig) links.push(["Instagram",r.ig]);
  if(r.fb) links.push(["Facebook",r.fb]);
  if(r.resa) links.push(["Réserver une table","Réservation en ligne"]);
  const m = r.menu;
  return `
  <div class="fiche-hero">
    <div class="wrap">
      <p class="crumbs"><a href="/">Accueil</a> › <a href="/annuaire/">Annuaire</a> › <a href="/annuaire/" data-commune="${r.commune}">${r.commune}</a> › ${r.name}</p>
      <div class="row"><span class="badge b-part">${svg("tart",4).replace('<svg','<svg width="14" height="14"')} Restaurant partenaire Miette</span>${isP?`<span class="badge b-une" title="Mise en avant payante (forfait Premium)">★ À la une · annonce</span>`:""}</div>
      <div class="name-row rv"><h1>${r.name}</h1><button type="button" class="heart" data-fav="${r.slug}" aria-pressed="${isFav(r.slug)}" aria-label="${isFav(r.slug)?"Retirer de mes favoris":"Ajouter à mes favoris"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8.2 3.4 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.6 0 5.5 3.7 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z" stroke-linejoin="round"/></svg></button></div>
      <div class="row meta"><span><b style="color:var(--ink)">${r.commune}</b>${r.station?` · ${r.station}`:""}</span><span>${r.cuisine}</span><span>Prix moyen <span class="price" style="color:var(--ink)">${priceTxt(r)}</span> par personne</span></div>
      ${(()=>{const cs=closureState(r);
        if(cs.now) return `<p class="today-chip closed"><b>Aujourd'hui</b> Fermé pour congés</p>
      <div class="conges-band now rv">${ic.cal}<div><b>${cs.now.label} : le restaurant est fermé</b><p>Du ${longDate(cs.now.from)} au ${longDate(cs.now.to)} inclus. Réouverture le <b>${longDate(dayAfter(cs.now.to))}</b>.</p></div></div>`;
        return `<p class="today-chip ${r.hours[today]==="Fermé"?"closed":""}"><b>Aujourd'hui</b> ${r.hours[today]==="Fermé"?"Fermé":r.hours[today]}</p>`+(cs.next?`
      <div class="conges-band soon rv">${ic.cal}<div><b>${cs.next.label} à venir</b><p>Fermé du ${longDate(cs.next.from)} au ${longDate(cs.next.to)} inclus.</p></div></div>`:"");})()}
      ${r.offre?`<div class="offre-band rv d1">${svg("gift",3)}<div style="flex:1 1 260px"><b>Offre Miette : une attention vous attend</b><p class="m-hide" style="font-size:.95rem">1 fois par mois dans ce restaurant, avec votre compte Miette (3 restaurants différents par mois maximum).</p></div><button type="button" class="btn om-btn" data-offer="${r.slug}"><span class="lg-t">Profiter de mon Offre Miette</span><span class="sh-t">J'en profite</span></button></div>`:""}
      <div class="demo-bar" role="region" aria-label="Simulation des forfaits">
        <p><b>Fiche d'exemple.</b> Ce restaurant est fictif. Voyez la fiche telle qu'elle apparaît avec chaque forfait. Les cases en pointillés montrent ce qui s'ajoute avec un forfait supérieur.</p>
        <div class="seg" role="group" aria-label="Forfait simulé">${Object.values(PLANS).map(p=>`<button type="button" data-sim="${p.key}" aria-pressed="${plan.key===p.key}">${p.short}</button>`).join("")}</div>
      </div>
    </div>
  </div>
  <div class="wrap fiche">
    <main>
      <div class="rv">
        <h2>Photos <span class="tag-slot">${nPh} photos · ${plan.short}</span></h2>
        <div class="gal">${gal}</div>
      </div>
      <div class="rv">
        <h2>La carte <span class="tag-slot">${plan.updates} mises à jour / an</span></h2>
        <div class="menu-doc">
          <div class="mcarte">
            <h3>${r.name}</h3><p class="sub">La carte</p>
            ${m.sections.map(s=>`<h4>${s[0]}</h4>${s[1].map(it=>`<div class="it"><span>${it[0]}</span><i></i><span class="pr">${it[1]}</span></div>`).join("")}`).join("")}
          </div>
          <div class="menu-side">
            <div class="verif">${ic.shield}<span>Carte vérifiée le <b>${r.verified}</b></span></div>
            <button class="btn btn-primary" type="button" data-pdf style="justify-content:center;white-space:normal;text-align:center">Télécharger la carte du restaurant (PDF)</button>
            <p class="muted m-hide" style="font-size:.85rem">Ici, la carte est présentée aux couleurs de Miette pour une lecture facile. Le PDF est la version dessinée par le restaurant. Les prix peuvent évoluer : en cas de doute, appelez-le.</p>
          </div>
        </div>
      </div>
      <div class="rv">
        <h2>À propos</h2>
        <div class="seo-text"><p>${r.desc}</p><p class="m-hide"><b>${r.name}</b> est un restaurant de type ${r.cuisine.toLowerCase()} situé à ${r.commune}${r.station?` (${r.station})`:""}. Prix moyen : ${priceTxt(r)} par personne. Quelques plats de la carte : ${m.sections.flatMap(s=>s[1]).slice(0,4).map(i=>i[0].toLowerCase()).join(", ")}.</p></div>
      </div>
      <div class="rv">
        <h2>Équipements</h2>
        <div class="eqs">${Object.entries(EQUIP).map(([k,v])=>`<div class="${r.equip.includes(k)?"":"no"}">${r.equip.includes(k)?ic.check:ic.cross}${v}</div>`).join("")}</div>
      </div>
      <div class="rv ${r.pay.length?"":"m-hide"}">
        <h2>Moyens de paiement</h2>
        <div class="eqs pays">${Object.entries(PAY).map(([k,v])=>`<div class="${r.pay.includes(k)?"":"no"}">${r.pay.includes(k)?ic.check:ic.cross}<span>${v}<small>${r.pay.includes(k)?"Accepté":"Non accepté"}</small></span></div>`).join("")}</div>
        <p class="muted m-hide" style="font-size:.85rem;margin-top:10px">Carte bancaire et espèces selon l'établissement. En cas de doute, demandez au restaurant avant de commander.</p>
      </div>
    </main>
    <aside class="info">
      <div class="box">
        <h3>Téléphone</h3>
        <div class="tel"><strong>${r.phone}</strong><button class="small-btn" type="button" data-copy="${r.phone}">Copier</button></div>
      </div>
      <div class="box">
        <h3>Horaires</h3>
        <table class="hours"><tbody>${r.hours.map((h,i)=>`<tr class="${i===today?"today":""}"><td>${days[i]}</td><td>${h}</td></tr>`).join("")}</tbody></table>
      </div>
      <div class="box closures ${closureState(r).list.length?"":"m-hide"}">
        <h3>Fermetures et congés</h3>
        ${(()=>{const cs=closureState(r);return cs.list.length?`<ul class="clist">${cs.list.map(c=>`<li class="${c===cs.now?"now":""}"><b>${c.label}</b><span>Du ${longDate(c.from)} au ${longDate(c.to)}</span>${c===cs.now?`<em>En cours</em>`:""}</li>`).join("")}</ul>`:`<p class="muted" style="font-size:.92rem">Aucune fermeture prévue pour le moment.</p>`;})()}
        <p class="muted" style="font-size:.8rem">Dates communiquées par le restaurant.</p>
      </div>
      <div class="box">
        <h3>Adresse</h3>
        <p>${r.addr}</p>
        ${mapSVG([r],{focus:r})}
        <a class="small-btn" style="justify-self:start;text-decoration:none" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}">Ouvrir l'itinéraire</a>
      </div>
      ${plan.links && links.length ? `<div class="box"><h3>Liens <span class="tag-slot">Visibilité +</span></h3><div class="links">${links.map(l=>`<a href="/restaurants/${r.slug}/" data-link>${l[0]}<span class="muted" style="font-weight:500;font-size:.85rem">${l[1]}</span></a>`).join("")}</div></div>`
        : `<div class="box demo-only"><h3>Liens</h3><div class="locked" style="aspect-ratio:auto;padding:22px"><span><b>Site, réseaux, réservation</b>Dès Miette Visibilité</span></div></div>`}
    </aside>
  </div>
  <nav class="mbar" aria-label="Actions rapides">
    <a href="tel:${r.phone.replace(/ /g,"")}" data-call="${r.phone}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>Appeler</a>
    <a href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>Itinéraire</a>
    <button type="button" data-tomenu><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h11l3 3v15H5z"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>La carte</button>
  </nav>`;
}
const favs=new Set((()=>{try{return JSON.parse(store.get("miette-favs")||"[]")}catch(e){return[]}})());
function isFav(sl){return favs.has(sl)}
function bindResto(r){
  if(!bindResto.last||bindResto.last!==r.slug+location.pathname){bindResto.last=r.slug+location.pathname;track(r.slug,"vue");}
  $$("[data-tomenu]").forEach(b=>b.onclick=()=>{const m=$(".mcarte");if(m)m.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"})});
  $$("[data-call]").forEach(a=>a.addEventListener("click",()=>toast("Numéro du restaurant : "+a.dataset.call)));
  $$("[data-offer]").forEach(b=>b.onclick=()=>openOffer(bySlug[b.dataset.offer]));
  $$("[data-fav]").forEach(b=>b.onclick=()=>{const sl=b.dataset.fav;const on=!favs.has(sl);on?favs.add(sl):favs.delete(sl);store.set("miette-favs",JSON.stringify([...favs]));
    b.setAttribute("aria-pressed",on);b.setAttribute("aria-label",on?"Retirer de mes favoris":"Ajouter à mes favoris");b.classList.remove("pop");void b.offsetWidth;b.classList.add("pop");
    updFavN();syncFav(sl,on);toast(on?(userGet()?"Ajouté à vos favoris.":"Ajouté à vos favoris. Créez votre compte Miette pour les retrouver sur tous vos appareils."):"Retiré de vos favoris.");});
  $$("[data-sim]").forEach(b=>b.onclick=()=>{demoPlan=b.dataset.sim;render("r-"+r.slug,false,true)});
  $$("[data-copy]").forEach(b=>b.onclick=()=>{const t=b.dataset.copy;try{navigator.clipboard.writeText(t).then(()=>toast("Numéro copié : "+t),()=>toast("Numéro : "+t))}catch(e){toast("Numéro : "+t)}});
  $$("[data-pdf]").forEach(b=>b.onclick=()=>toast("Fiche d'exemple : sur le site en ligne, ce bouton télécharge la carte du restaurant en PDF."));
  $$("[data-link]").forEach(a=>a.onclick=e=>{e.preventDefault();toast("Fiche d'exemple : ce lien mènera vers le site ou le réseau du restaurant.")});
  const ld = {"@context":"https://schema.org","@type":"Restaurant",name:r.name,servesCuisine:r.cuisine,priceRange:`${r.price[0]}–${r.price[1]} €`,telephone:r.phone,address:{"@type":"PostalAddress",streetAddress:r.addr.split(",")[0],addressLocality:r.commune,addressCountry:"FR"},geo:{"@type":"GeoCoordinates",latitude:r.lat,longitude:r.lng},hasMenu:"#"};
  let s=$("#ld"); if(!s){s=document.createElement("script");s.type="application/ld+json";s.id="ld";document.head.appendChild(s);} s.textContent=JSON.stringify(ld);
}

/* devenir partenaire */
function planCard(p,hot){
  const rows = [
    [true,"Fiche restaurant, téléphone, horaires, adresse sur la carte"],
    [true,"Votre carte en PDF + tarifs, avec date de vérification"],
    [true,`${p.photos} photos du restaurant et des plats`],
    [true,`${p.updates} mises à jour de la carte par an${p.updates===12?" (1 par mois)":""}`],
    [p.links,"Liens vers votre site, vos réseaux et la réservation"],
    [p.key!=="essentiel", p.key==="premium"?"1 publication dédiée par mois + 2 apparitions collectives sur Instagram et TikTok":"1 apparition par mois dans une publication collective Instagram et TikTok"],
    [p.carousel,"Place dans le carrousel « À la une » de l'accueil"],
    [p.key==="premium","Position prioritaire dans l'annuaire + badge « À la une »"],
    [true,"Rapport de statistiques par mail chaque trimestre"]
  ];
  return `<article class="plan rv ${hot?"hot":""}">
    ${hot?`<span class="flag">10 places seulement</span>`:""}
    <div><p class="eyebrow" style="${hot?"color:var(--yellow)":""}">${p.name}</p><h3>${p.key==="essentiel"?"Être trouvé":p.key==="visibilite"?"Être remarqué":"Être incontournable"}</h3></div>
    <p class="amount">${p.price} €<small> / mois</small></p>
    <ul>${rows.map(([ok,t])=>`<li class="${ok?"":"off"}">${ok?ic.check:ic.cross}<span>${t}</span></li>`).join("")}</ul>
    <a class="btn ${hot?"btn-yellow":"btn-primary"}" style="justify-content:center" href="/partenaire/#partenaire-contact" data-choose="${p.key}">Choisir ${p.short}</a>
  </article>`;
}
function pagePartner(){
  return `
  <section class="p-hero">
    <div class="wrap">
      <p class="eyebrow">Restaurateurs de Charente-Maritime</p>
      <h1 class="rv">Votre carte, vue par ceux<br> qui cherchent où manger</h1>
      <p class="lead rv d1">Miette réunit les restaurants de la Charente-Maritime avec leur carte à jour. Vous nous envoyez vos changements par mail, on s'occupe de la mise en ligne, des photos et de la mise en avant.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:26px" class="rv d2"><a class="btn btn-ghost" style="border-color:var(--orange);color:var(--orange-ink)" href="/partenaire/#partenaire-forfaits">Voir les forfaits</a><a class="btn btn-primary" href="/partenaire/#partenaire-contact">Référencer mon restaurant</a></div>
      <a class="launch-pill rv d3" href="/partenaire/#partenaire-lancement"><b>Offre de lancement</b> 2 mois offerts pour les ${TEST.spots} premiers restaurants ${ic.arrow}</a>
    </div>
  </section>

  <section id="partenaire-forfaits">
    <div class="wrap">
      <div class="sec-head"><div><p class="eyebrow">Trois forfaits, sans engagement</p><h2 class="rv">Choisissez votre place</h2></div><p>Sans frais d'installation et sans engagement : résiliable à tout moment avec un mois de préavis. Un échange personnel a lieu au bout d'un an.</p></div>
      <div class="plans">${planCard(PLANS.essentiel)}${planCard(PLANS.visibilite)}${planCard(PLANS.premium,true)}</div>
      <p class="muted" style="margin-top:18px;font-size:.92rem">La correction d'une simple erreur sur votre carte est gratuite et ne compte pas dans vos mises à jour. Une mise à jour = une carte entière (changement de saison, menu de Saint-Valentin…). Quand les 10 places Premium sont prises, les demandes passent sur liste d'attente.</p>
      <p class="ft-note" style="margin-top:14px"><b>Vous avez un foodtruck ?</b> Les mêmes forfaits s'appliquent, avec une fiche pensée pour vous : votre planning de la semaine et vos emplacements du jour. <a href="/foodtrucks/">Voir l'espace foodtrucks</a></p>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="wrap">
      <h2 class="rv" style="font-size:clamp(1.8rem,3.6vw,2.6rem);margin-bottom:20px">Comparer en détail</h2>
      <div class="tbl-wrap rv"><table class="cmp">
        <thead><tr><th scope="col">Ce qui est inclus</th><th scope="col">Essentiel</th><th scope="col">Visibilité</th><th scope="col">Premium</th></tr></thead>
        <tbody>
          <tr><th scope="row">Prix par mois</th><td class="price">34,90 €</td><td class="price">49,90 €</td><td class="price">79,90 €</td></tr>
          <tr><th scope="row">Fiche, téléphone, horaires, plan, menu avec tarifs</th><td class="yes">Oui</td><td class="yes">Oui</td><td class="yes">Oui</td></tr>
          <tr><th scope="row">Photos du restaurant et des plats</th><td>4</td><td>6</td><td>8</td></tr>
          <tr><th scope="row">Lien site web, réseaux ou réservation</th><td>—</td><td class="yes">Oui</td><td class="yes">Oui</td></tr>
          <tr><th scope="row">Mises à jour de la carte par an</th><td>2</td><td>4</td><td>12</td></tr>
          <tr><th scope="row">Instagram et TikTok</th><td>—</td><td>1 apparition collective / mois</td><td>1 publication dédiée + 2 collectives / mois</td></tr>
          <tr><th scope="row">Carrousel de l'accueil</th><td>—</td><td>—</td><td class="yes">Présence continue</td></tr>
          <tr><th scope="row">Priorité dans l'annuaire + badge « À la une »</th><td>—</td><td>—</td><td class="yes">Oui</td></tr>
          <tr><th scope="row">Rapport de statistiques trimestriel</th><td class="yes">Oui</td><td class="yes">Oui</td><td class="yes">Oui</td></tr>
        </tbody></table></div>
      <p class="muted" style="margin-top:14px;font-size:.92rem">Envie de voir le rendu ? Ouvrez la <a href="/restaurants/exemple/" style="color:var(--orange-ink);font-weight:700">fiche d'exemple</a> et comparez les trois forfaits en un clic.</p>
    </div>
  </section>

  <section style="background:var(--surface-2)">
    <div class="wrap two">
      <div class="rv">
        <p class="eyebrow">Partenariat</p>
        <h2 style="font-size:clamp(2rem,4vw,3rem);margin:8px 0 16px">L'Offre Miette : la preuve que ça marche</h2>
        <p>Vous offrez une petite attention de votre choix (un café, une boisson, une mignardise…) aux clients qui disent venir de la part de Miette. Le client apprécie le geste, et vous voyez concrètement combien de tables Miette vous amène.</p>
        <ul style="margin-top:16px;display:grid;gap:8px;padding-left:1.2em">
          <li>Un bandeau sur votre fiche et une pastille dans l'annuaire</li>
          <li>Un filtre « Restaurants avec Offre Miette » pour les clients</li>
          <li>Les conditions se décident avec vous (exemple : une offre par table, avec un repas)</li>
        </ul>
        <p class="muted" style="margin-top:14px;font-size:.9rem">Avec le compte client : le client tend son téléphone, votre équipe tape le code à 4 chiffres du restaurant, et l'offre est validée et comptée dans votre rapport. Une fois par mois et par client, pas plus. <a href="/restaurants/exemple/" style="color:var(--orange-ink);font-weight:700">Voir la démonstration</a></p>
      </div>
      <div class="rv d1"><div class="offre-band" style="margin:0;box-shadow:var(--shadow)">${svg("gift",3)}<div><b>Offre Miette : une attention vous attend</b><p style="font-size:.95rem">Dites que vous venez de Miette en passant commande, le restaurant vous offre un petit plus.</p></div></div><p class="muted" style="margin-top:10px;font-size:.88rem;text-align:center">Aperçu du bandeau sur votre fiche</p></div>
    </div>
  </section>

  <section>
    <div class="wrap two">
      <div class="report rv" aria-label="Exemple de rapport trimestriel">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><b style="font-family:var(--f-display);font-size:1.2rem">Rapport trimestriel · exemple</b><span class="badge b-plan">Juil. – sept.</span></div>
        <div class="kpis"><div><b>1 284</b><span>visites de votre fiche</span></div><div><b>96</b><span>appels lancés</span></div><div><b>212</b><span>menus téléchargés</span></div><div><b>58</b><span>clics vers votre site</span></div></div>
        <svg class="spark" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 L30 44 L60 46 L90 36 L120 38 L150 28 L180 30 L210 18 L240 22 L270 12 L300 8 L300 60 L0 60Z" style="fill:var(--surface-2)"/><path d="M0 50 L30 44 L60 46 L90 36 L120 38 L150 28 L180 30 L210 18 L240 22 L270 12 L300 8" fill="none" style="stroke:var(--orange)" stroke-width="3"/><circle cx="298" cy="8" r="4" style="fill:var(--orange)"/></svg>
        <p class="muted" style="font-size:.82rem">Chiffres fictifs, pour l'exemple.</p>
      </div>
      <div class="rv d1">
        <p class="eyebrow">Suivi</p>
        <h2 style="font-size:clamp(2rem,4vw,3rem);margin:8px 0 16px">Des chiffres chaque trimestre, sans rien faire</h2>
        <p>Chaque restaurant reçoit automatiquement par mail un rapport : visites de la fiche, clics sur le téléphone ou le site, téléchargements du menu. Les statistiques sont anonymes et respectent le RGPD.</p>
        <h3 style="margin-top:28px;font-size:1.4rem">En option : rafraîchir votre carte</h3>
        <p style="margin-top:8px">Votre carte a besoin d'un coup de neuf ? À partir de votre document d'origine, je réalise une nouvelle mise en page, sur devis validé avant de commencer.</p>
      </div>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="wrap faq">
      <h2 class="rv" style="font-size:clamp(1.8rem,3.6vw,2.6rem);margin-bottom:10px">Questions fréquentes</h2>
      <details><summary>Comment je modifie ma carte ?</summary><p>Vous envoyez votre nouvelle carte par mail (PDF, photo ou document). Elle est mise en ligne et la date « Carte vérifiée le » est actualisée.</p></details>
      <details><summary>Est-ce que les clients peuvent laisser des avis ?</summary><p>Non. Miette n'affiche ni notes ni avis. Votre fiche présente des informations factuelles : carte, prix, horaires, photos, équipements.</p></details>
      <details><summary>Que se passe-t-il si les 10 places Premium sont prises ?</summary><p>Votre demande passe sur liste d'attente et vous êtes prévenu dès qu'une place se libère. En attendant, vous pouvez démarrer avec Miette Visibilité.</p></details>
      <details><summary>Suis-je engagé sur une durée ?</summary><p>Non. L'abonnement est sans engagement : vous pouvez l'arrêter à tout moment par e-mail, avec un mois de préavis. Le paiement se fait chaque mois par virement permanent.</p></details>
      <details><summary>Puis-je changer de forfait ?</summary><p>Oui, il suffit d'en faire la demande par mail. Le nouveau forfait s'applique au mois suivant.</p></details>
    </div>
  </section>

  <section id="partenaire-contact" style="background:var(--surface);border-top:1px solid var(--line)">
    <div class="wrap" style="max-width:860px">
      <p class="eyebrow">Inscription</p>
      <h2 class="rv" style="font-size:clamp(2rem,4.4vw,3.2rem);margin:8px 0 12px">Référencer mon restaurant</h2>
      <p class="muted" style="margin-bottom:24px">Laissez vos coordonnées : je vous rappelle ou je passe vous présenter Miette au restaurant. Vous pouvez aussi écrire à <b style="user-select:all;color:var(--ink)">miettefoodclub@gmail.com</b>.</p>
      <div class="launch" id="partenaire-lancement">
        <div class="launch-txt">
          <p class="launch-eyebrow">Offre de lancement · phase test</p>
          <h3>2 mois offerts sur Miette Visibilité</h3>
          <p>Les ${TEST.spots} premiers restaurants qui rejoignent Miette testent gratuitement le forfait <b>Miette Visibilité</b> (49,90 € par mois) pendant 2 mois : fiche complète, 6 photos, liens vers votre site et vos réseaux, apparition sur Instagram et TikTok. À la fin du test, vous êtes libre : continuer avec le forfait de votre choix, ou arrêter, sans aucune obligation (votre fiche est alors retirée du site).</p>
        </div>
        <div class="launch-side">
          <p class="launch-n"><b>${TEST.spots-TEST.taken}</b> place${TEST.spots-TEST.taken>1?"s":""} sur ${TEST.spots}</p>
          <div class="launch-bar" role="img" aria-label="${TEST.taken} places prises sur ${TEST.spots}"><i style="width:${Math.max(4,TEST.taken/TEST.spots*100)}%"></i></div>
          <button type="button" class="btn btn-primary" id="launch-go" style="justify-content:center">Je veux tester gratuitement</button>
        </div>
      </div>
      <form class="form" id="contact-form" novalidate><input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px">
        <div class="full" style="display:grid;gap:8px"><span style="font-weight:600;font-size:.92rem">Vous êtes</span><div class="radios"><label><input type="radio" name="c-type" id="c-type-resto" value="resto" checked>Un restaurant</label><label><input type="radio" name="c-type" id="c-type-ft" value="ft">Un foodtruck</label></div></div>
        <label>Nom de l'établissement<input class="field" id="c-resto" required autocomplete="organization"></label>
        <label>Commune<input class="field" id="c-commune" required autocomplete="address-level2"></label>
        <label>Votre nom<input class="field" id="c-nom" required autocomplete="name"></label>
        <label>Téléphone<input class="field" id="c-tel" type="tel" autocomplete="tel"></label>
        <label class="full">E-mail<input class="field" id="c-mail" type="email" required autocomplete="email"></label>
        <div class="full" style="display:grid;gap:8px"><span style="font-weight:600;font-size:.92rem">Forfait qui vous intéresse</span><div class="radios"><label><input type="radio" name="c-plan" id="c-plan-test" value="test">Test gratuit 2 mois · Visibilité</label>${Object.values(PLANS).map(p=>`<label><input type="radio" name="c-plan" id="c-plan-${p.key}" value="${p.key}">${p.short} · ${p.price} €</label>`).join("")}<label><input type="radio" name="c-plan" id="c-plan-nsp" value="nsp" checked>Je ne sais pas encore</label></div></div>
        <label class="full">Message (facultatif)<textarea class="field" id="c-msg" rows="4"></textarea></label>
        <label class="full check"><input type="checkbox" id="c-ok" required> J'accepte que Miette utilise ces informations pour me recontacter au sujet de mon référencement.</label>
        <div class="full" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><button class="btn btn-primary" type="submit">Envoyer ma demande</button><p id="c-err" class="muted" role="alert"></p></div>
      </form>
      <div class="notice" id="c-done" hidden></div>
    </div>
  </section>`;
}
function bindPartner(){
  $$('a[href^="/partenaire/#"]').forEach(a=>a.addEventListener("click",e=>{const el=document.getElementById(a.getAttribute("href").split("#")[1]);if(el){e.preventDefault();e.stopPropagation();history.replaceState(null,"",a.getAttribute("href"));el.scrollIntoView({behavior:RM?"auto":"smooth"});}}));
  $$("[data-choose]").forEach(a=>a.addEventListener("click",()=>{setTimeout(()=>{const r=$("#c-plan-"+a.dataset.choose);if(r)r.checked=true},50)}));
  const lg=$("#launch-go");if(lg)lg.onclick=()=>{$("#c-plan-test").checked=true;$("#contact-form").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});setTimeout(()=>$("#c-resto").focus({preventScroll:true}),500);};
  $("#contact-form").addEventListener("submit",e=>{
    e.preventDefault();
    const req=["c-resto","c-commune","c-nom","c-mail"].map(id=>$("#"+id));
    const miss=req.filter(x=>!x.value.trim());
    const mailOk=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($("#c-mail").value);
    if(miss.length){$("#c-err").textContent="Complétez le nom de l'établissement, la commune, votre nom et votre e-mail.";miss[0].focus();return;}
    if(!mailOk){$("#c-err").textContent="L'adresse e-mail semble incomplète (exemple : nom@restaurant.fr).";$("#c-mail").focus();return;}
    if(!$("#c-ok").checked){$("#c-err").textContent="Cochez la case d'accord pour qu'on puisse vous recontacter.";return;}
    const form=$("#contact-form"),btn=form.querySelector('button[type="submit"]');
    if(form.dataset.sending)return;form.dataset.sending="1";btn.disabled=true;$("#c-err").textContent="Envoi en cours…";
    const isTest=$("#c-plan-test").checked;
    const fields={};[...form.elements].forEach(el=>{if(!el.id||el.type==="submit"||el.type==="checkbox"||el.name==="_honey")return;if(el.type==="radio"){if(el.checked){const k=(el.closest("fieldset,div.full")||{}).querySelector?.("span,legend")?.textContent||el.name;fields[k]=el.parentElement.textContent.trim();}return;}const lab=(el.closest("label")?.childNodes[0]?.textContent||el.id).trim();if(el.value.trim())fields[lab]=el.value.trim();});
    const hp=form.querySelector('[name="_honey"]');
    if(hp&&hp.value){form.hidden=true;return;}
    const mail=$("#c-mail").value.trim();
    // 1) enregistrement dans Supabase (la demande n'est jamais perdue)
    const saved=SB?SB.from("contact_requests").insert({etablissement:$("#c-resto").value.trim().slice(0,200),email:mail.slice(0,200),telephone:($("#c-tel")?$("#c-tel").value.trim():"").slice(0,40),details:fields}).then(({error})=>{if(error)throw error;return true;}):Promise.reject(new Error("nosb"));
    Promise.allSettled([saved]).then(([a])=>{if(a.status!=="fulfilled")throw new Error("send");
    $("#c-err").textContent="";$("#contact-form").hidden=true;
    const d=$("#c-done");d.hidden=false;
    d.innerHTML=`<b>Merci, ${$("#c-resto").value} !</b>${isTest?`<p style="margin-top:6px">Votre demande de test gratuit de 2 mois est bien prise en compte. Je vous recontacte pour mettre votre fiche en ligne.</p>`:""}<p style="margin-top:6px">Votre message est bien parti. Réponse sous 48 h ouvrées, par e-mail ou par téléphone.</p>`;
    }).catch(()=>{delete form.dataset.sending;btn.disabled=false;$("#c-err").innerHTML='L\'envoi n\'a pas abouti. Réessayez, ou écrivez directement à <a href="mailto:miettefoodclub@gmail.com">miettefoodclub@gmail.com</a>.';});
  });
}

/* ---------- Foodtrucks (espace à part, prévu pour plus tard) ---------- */
const DAYS=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const S=(commune,lieu,h,lat,lng)=>({commune,lieu,h,lat,lng});
const FT=[
 {slug:"le-camion-iode",name:"Le Camion Iodé",cuisine:"Fish & chips, produits de la mer",price:[10,16],offre:true,phone:"06 00 00 00 11",ig:"@lecamioniode",col:H("#cfe6e4","#7fc0b6"),kind:"fish",
  desc:"Fish & chips de poisson de la criée, bulots mayo et moules frites à emporter.",
  sched:[S("Royan","Marché central","11h30–14h",45.624,-1.029),S("Saint-Georges-de-Didonne","Place Michelet","18h–22h",45.603,-0.999),null,S("La Tremblade","Port de La Grève","11h30–14h",45.768,-1.142),S("Saint-Palais-sur-Mer","Front de mer","18h–22h",45.648,-1.088),S("Royan","Conche de Pontaillac","18h–23h",45.630,-1.052),S("Mornac-sur-Seudre","Parking du port","11h–15h",45.711,-1.027)],
  menu:[["À emporter",[["Fish & chips, sauce tartare","13 €"],["Cornet de bulots, mayonnaise maison","9 €"],["Moules frites","12 €"]]],["Douceurs",[["Churros, sucre et cannelle","5 €"]]]]},
 {slug:"burger-des-dunes",name:"Burger des Dunes",cuisine:"Burgers",price:[11,17],offre:true,phone:"06 00 00 00 12",ig:"@burgerdesdunes",col:H("#ffe1a8","#f7a14a"),kind:"plate",
  desc:"Burgers au bœuf charentais, pain brioché du boulanger et frites fraîches.",
  sched:[null,S("Les Mathes","Place de la mairie","18h30–22h",45.715,-1.155),S("La Palmyre","Avenue de l'Océan","18h30–23h",45.689,-1.183),S("Arvert","Place de l'église","18h30–22h",45.744,-1.126),S("Étaules","Salle des fêtes","18h30–22h",45.733,-1.099),S("La Palmyre","Avenue de l'Océan","18h30–23h",45.689,-1.183),null],
  menu:[["Burgers",[["Le Dune (bœuf, cheddar, oignons confits)","13 €"],["Le Végé (galette de pois chiches)","12 €"],["Menu burger + frites + boisson","16 €"]]]]},
 {slug:"tacos-tempo",name:"Tacos Tempo",cuisine:"Mexicain",price:[9,15],offre:false,phone:"06 00 00 00 13",ig:"@tacostempo",col:H("#ffd0b0","#f76116"),kind:"bowl",
  desc:"Tacos de maïs, burritos et nachos, avec des salsas maison plus ou moins piquantes.",
  sched:[S("Saujon","Place du marché","11h30–14h",45.673,-0.928),S("Médis","Parking de la mairie","18h–21h30",45.643,-0.964),S("Cozes","Halle","11h30–14h",45.583,-0.832),null,S("Semussac","Place centrale","18h–21h30",45.600,-0.913),S("Saujon","Gare","18h–22h",45.673,-0.928),null],
  menu:[["Tacos & co",[["3 tacos (poulet, bœuf ou légumes)","10 €"],["Burrito garni","11 €"],["Nachos, guacamole","7 €"]]]]},
 {slug:"la-crepe-roulante",name:"La Crêpe Roulante",cuisine:"Crêpes & galettes",price:[6,13],offre:true,phone:"06 00 00 00 14",ig:"@lacreperoulante",col:H("#ffeec2","#e9b872"),kind:"crepe",
  desc:"Galettes de sarrasin et crêpes sucrées faites à la minute, sur les marchés de l'estuaire.",
  sched:[S("Meschers-sur-Gironde","Marché","9h–13h",45.556,-0.946),null,S("Talmont-sur-Gironde","Entrée du village","11h–18h",45.536,-0.903),S("Mortagne-sur-Gironde","Port","11h–15h",45.477,-0.787),S("Royan","Marché central","9h–13h",45.624,-1.029),S("Meschers-sur-Gironde","Front de mer","15h–22h",45.556,-0.946),S("Talmont-sur-Gironde","Entrée du village","11h–18h",45.536,-0.903)],
  menu:[["Galettes",[["Complète","9 €"],["Chèvre, miel, noix","10 €"]]],["Crêpes",[["Caramel beurre salé maison","5 €"],["Nutella, banane","6 €"]]]]}
];
FT.splice(0,FT.length); // espace foodtrucks : ouverture prochaine
const ftBySlug=Object.fromEntries(FT.map(f=>[f.slug,f]));
const todayIdx=()=>(new Date().getDay()+6)%7;
let ftDay=null;
function ftCard(f,d){
  const st=f.sched[d];
  return `<a class="ft-card rv" href="/foodtrucks/${f.slug}/">
    <div class="ph" style="--a:${f.col[0]};--b:${f.col[1]};aspect-ratio:16/10;border-radius:16px">${svg(f.kind)}${f.offre||f.plan==="premium"?`<div class="badges">${f.plan==="premium"?`<span class="badge b-une" title="Mise en avant payante (forfait Premium)">★ À la une · annonce</span>`:""}${f.offre?`<span class="badge b-offre"><span class="pastille"></span>Offre Miette</span>`:""}</div>`:""}</div>
    <h3>${f.name}</h3><p class="ft-muted">${f.cuisine} · <span class="price">${f.price[0]} à ${f.price[1]} €</span></p>
    ${st?`<p class="ft-where"><b>${st.commune}</b> · ${st.lieu}<br><span>${st.h}</span></p>`:`<p class="ft-where off">Pas de sortie ce jour-là</p>`}
  </a>`;
}
function pageSoonFT(){
  return `<div class="ft">
  <section class="ft-hero">
    <div class="wrap">
      <p class="ft-eyebrow rv">Bientôt sur Miette</p>
      <h1 class="rv d1">Les foodtrucks</h1>
      <p class="ft-lead rv d2">Un espace à part pour les cuisines qui roulent : où ils s'installent chaque jour, ce qu'ils servent, et comment les joindre.</p>
    </div>
  </section>
  <section class="ft-today">
    <div class="wrap">
      <div class="ft-soon-pts">
        <div class="rv"><b>Le planning de la semaine</b><p>Touchez un jour, la carte vous montre où se trouve le camion.</p></div>
        <div class="rv d1"><b>La carte et les prix</b><p>Ce qu'il sert, à jour, comme pour les restaurants.</p></div>
        <div class="rv d2"><b>L'Offre Miette</b><p>Un petit plus offert chez les foodtrucks partenaires.</p></div>
      </div>
      <div class="ft-pro rv">
        <div><h3>Vous avez un foodtruck ?</h3><p>Votre planning de la semaine, votre carte et vos réseaux, sur une fiche faite pour les cuisines qui bougent. Laissez vos coordonnées : on vous prévient dès l'ouverture de l'espace foodtrucks.</p></div>
        <a class="btn btn-white" href="/partenaire/#partenaire-contact" data-ft="1">Être prévenu ${ic.arrow}</a>
      </div>
    </div>
  </section></div>`;
}
function pageFoodtrucks(){
  if(!FT.length) return pageSoonFT();
  const d = ftDay==null?todayIdx():ftDay;
  const here = FT.filter(f=>f.sched[d]);
  const pins = here.map(f=>({slug:f.slug,name:f.name,commune:f.sched[d].commune,lat:f.sched[d].lat,lng:f.sched[d].lng,plan:""}));
  return `<div class="ft">
  <section class="ft-hero">
    <div class="wrap">
      <p class="ft-eyebrow rv">Aperçu · bientôt sur Miette</p>
      <h1 class="rv d1">Les foodtrucks</h1>
      <p class="ft-lead rv d2">Un espace à part pour les cuisines qui roulent : où ils s'installent chaque jour, ce qu'ils servent, et comment les joindre.</p>
    </div>
  </section>
  <section class="ft-today">
    <div class="wrap">
      <div class="sec-head"><div><h2 class="rv">Où les trouver ${d===todayIdx()?"aujourd'hui":DAYS[d].toLowerCase()} ?</h2></div>
        <div class="ft-days" role="group" aria-label="Choisir le jour">${DAYS.map((n,i)=>`<button type="button" data-day="${i}" aria-pressed="${i===d}">${n.slice(0,3)}${i===todayIdx()?"<i>auj.</i>":""}</button>`).join("")}</div></div>
      <div class="ft-split">
        <div class="ft-map">${pins.length?mapSVG(pins,{prefix:"ft-"}):`<div class="empty">Aucun foodtruck ce jour-là.</div>`}</div>
        <div class="ft-list">${here.length?here.map(f=>{const st=f.sched[d];return `<a href="/foodtrucks/${f.slug}/" class="ft-row"><span class="ft-ic">${svg(f.kind,3)}</span><span><b>${f.name}</b><small>${st.commune} · ${st.lieu}</small></span><time>${st.h}</time></a>`}).join(""):`<p class="ft-muted">Pas de sortie prévue ce jour-là.</p>`}</div>
      </div>
    </div>
  </section>
  <section>
    <div class="wrap">
      <div class="sec-head"><h2 class="rv">Tous les foodtrucks</h2><p class="ft-muted">Le planning de la semaine est sur chaque fiche.</p></div>
      <div class="ft-grid">${[...FT].sort((a,b)=>(b.plan==="premium")-(a.plan==="premium")).map(f=>ftCard(f,d)).join("")}</div>
      <div class="ft-pro rv">
        <div><h3>Vous avez un foodtruck ?</h3><p>Votre planning de la semaine, votre carte et vos réseaux, sur une fiche faite pour les cuisines qui bougent. Mêmes forfaits que les restaurants : Miette Essentiel 34,90 €, Visibilité 49,90 € et Premium 79,90 € par mois. Laissez vos coordonnées pour être prévenu de l'ouverture.</p></div>
        <a class="btn btn-white" href="/partenaire/#partenaire-contact" data-ft="1">Être prévenu ${ic.arrow}</a>
      </div>
      <p class="ft-muted" style="margin-top:20px;font-size:.88rem">Aperçu : cet espace ouvrira dans un second temps. Les foodtrucks présentés sont fictifs.</p>
    </div>
  </section></div>`;
}
function bindFoodtrucks(){
  $$("[data-day]").forEach(b=>b.onclick=()=>{ftDay=+b.dataset.day;render("foodtrucks",false,true)});
  $$("[data-ft]").forEach(a=>a.addEventListener("click",()=>setTimeout(()=>{const r=$("#c-type-ft");if(r){r.checked=true;r.dispatchEvent(new Event("change"))}},500)));
}
function pageFT(f){
  const t=todayIdx(), st=f.sched[t];
  return `<div class="ft">
  <section class="ft-hero" style="padding-bottom:36px">
    <div class="wrap">
      <p class="crumbs ft-muted"><a href="/">Accueil</a> › <a href="/foodtrucks/">Foodtrucks</a> › ${f.name}</p>
      <div class="row" style="display:flex;gap:8px;flex-wrap:wrap"><span class="badge b-part">${svg("truck",4).replace('<svg','<svg width="16" height="16"')} Foodtruck partenaire Miette</span></div>
      <h1 class="rv" style="margin-top:10px">${f.name}</h1>
      <p class="ft-lead">${f.cuisine}</p>
      <div class="ft-now rv d1">${st?`<span class="ft-live"></span><div><small>Aujourd'hui</small><b>${st.commune} · ${st.lieu}</b><span>${st.h}</span></div>`:`<div><small>Aujourd'hui</small><b>Pas de sortie</b><span>Regardez le planning de la semaine.</span></div>`}</div>
      ${f.offre?`<div class="offre-band rv d2">${svg("gift",3)}<div><b>Offre Miette : une attention vous attend</b><p style="font-size:.95rem">Dites que vous venez de Miette en passant commande, le foodtruck vous offre un petit plus.</p></div></div>`:""}
    </div>
  </section>
  <section style="padding-top:40px">
    <div class="wrap fiche" style="padding-block:0 40px">
      <main>
        <div class="rv"><h2>Planning de la semaine</h2>
          <p class="ft-hint">Touchez un jour pour voir l'emplacement sur la carte.</p>
          <div class="ft-week">${f.sched.map((x,i)=>`<button type="button" data-ftd="${i}" aria-pressed="${i===t}" class="${i===t?"today":""} ${x?"":"off"}"><b>${DAYS[i]}</b>${x?`<span>${x.commune}</span><small>${x.lieu} · ${x.h}</small>`:`<span>Repos</span>`}<span class="sel-tag">▸ Sur la carte</span></button>`).join("")}</div>
        </div>
        <div class="rv"><h2>La carte</h2>
          <div class="mcarte" style="color:var(--ink)"><h3>${f.name}</h3><p class="sub">La carte</p>${f.menu.map(s=>`<h4>${s[0]}</h4>${s[1].map(it=>`<div class="it"><span>${it[0]}</span><i></i><span class="pr">${it[1]}</span></div>`).join("")}`).join("")}</div>
        </div>
        <div class="rv"><h2>À propos</h2><p>${f.desc}</p></div>
      </main>
      <aside class="info">
        <div class="box ft-loc" id="ft-loc" style="color:var(--ink)">${ftLoc(f,t)}</div>
        <div class="box" style="color:var(--ink)"><h3>Téléphone</h3><div class="tel"><strong>${f.phone}</strong><button class="small-btn" type="button" data-copy="${f.phone}">Copier</button></div></div>
        <div class="box" style="color:var(--ink)"><h3>Suivre ses déplacements</h3><div class="links"><a href="/foodtrucks/${f.slug}/" data-link>Instagram<span class="muted" style="font-weight:500;font-size:.85rem">${f.ig}</span></a></div></div>
      </aside>
    </div>
  </section></div>`;
}
function ftLoc(f,i){
  const x=f.sched[i], t=todayIdx(), when=i===t?"aujourd'hui":DAYS[i].toLowerCase();
  if(!x) return `<h3>Où sommes-nous ${when} ?</h3><p class="muted" style="font-size:.95rem">Pas de sortie ${i===t?"aujourd'hui":"le "+when} : nous nous reposons.</p>`;
  return `<h3>Où sommes-nous ${when} ?</h3>
    <p class="ft-where-txt"><b>${x.commune}</b>${x.lieu} · ${x.h}</p>
    ${mapSVG([{slug:f.slug,name:f.name,commune:x.commune,lat:x.lat,lng:x.lng,plan:""}],{focus:x,prefix:"ft-"})}
    <a class="small-btn" style="justify-self:start;text-decoration:none" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${x.lat},${x.lng}">Ouvrir l'itinéraire</a>
    <button type="button" class="ft-back" data-ftback>↑ Voir un autre jour</button>`;
}
function bindFT(f){
  document.addEventListener("click",e=>{if(e.target.closest("[data-ftback]")){const w=$(".ft-week");if(w)window.scrollTo({top:w.getBoundingClientRect().top+window.scrollY-140,behavior:"smooth"});}});
  $$("[data-ftd]").forEach(b=>b.onclick=()=>{const i=+b.dataset.ftd;$$("[data-ftd]").forEach(x=>x.setAttribute("aria-pressed",x===b));const box=$("#ft-loc");box.innerHTML=ftLoc(f,i);
    if(window.innerWidth<860){const y=box.getBoundingClientRect().top+window.scrollY-90;window.scrollTo({top:y,behavior:"smooth"});}
    else{box.animate([{transform:"scale(.98)",opacity:.6},{transform:"none",opacity:1}],{duration:260,easing:"ease-out"});}});
  $$("[data-copy]").forEach(b=>b.onclick=()=>{const t=b.dataset.copy;try{navigator.clipboard.writeText(t).then(()=>toast("Numéro copié : "+t),()=>toast("Numéro : "+t))}catch(e){toast("Numéro : "+t)}});
  $$("[data-link]").forEach(a=>a.onclick=e=>{e.preventDefault();toast("Fiche d'exemple : ce lien mènera vers le compte Instagram du foodtruck.")});
}

/* ---------- Comptes Miette (Supabase) ---------- */
const CFG = window.MIETTE_CONFIG||{};
const SB = (CFG.supabaseUrl && CFG.supabaseKey && window.supabase) ? window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey) : null;
let acctMode=(/type=recovery/.test(location.hash)||/[?&]reset=1/.test(location.search))?"reset":"signup";
let ME = null;          // {id,prenom,email,commune,news,offers:[{slug,ts}],block:{slug:ms}}
let authReady = !SB;
async function loadMe(){
  if(!SB){ME=null;return;}
  const {data:{session}} = await SB.auth.getSession();
  if(!session){ME=null;return;}
  const uid=session.user.id;
  const [p,o,f,a] = await Promise.all([
    SB.from("profiles").select("prenom,commune,news").eq("id",uid).maybeSingle(),
    SB.from("offers").select("slug,validated_at").order("validated_at",{ascending:false}),
    SB.from("favorites").select("slug"),
    SB.from("pin_attempts").select("slug,blocked_until")
  ]);
  const prof=p.data||{};
  ME={id:uid,email:session.user.email,prenom:prof.prenom||(session.user.user_metadata||{}).prenom||"",commune:prof.commune||"",news:!!prof.news,
      offers:(o.data||[]).map(x=>({slug:x.slug,ts:new Date(x.validated_at).getTime()})),
      block:Object.fromEntries((a.data||[]).filter(x=>x.blocked_until).map(x=>[x.slug,new Date(x.blocked_until).getTime()]))};
  // favoris : on fusionne ceux de l'appareil avec ceux du compte
  const server=new Set((f.data||[]).map(x=>x.slug));
  const local=[...favs].filter(s=>!server.has(s));
  if(local.length) await SB.from("favorites").upsert(local.map(slug=>({user_id:uid,slug})),{onConflict:"user_id,slug"});
  server.forEach(s=>favs.add(s)); store.set("miette-favs",JSON.stringify([...favs])); updFavN();
}
function userGet(){return ME;}
async function syncFav(slug,on){
  if(!SB||!ME) return;
  if(on) await SB.from("favorites").upsert({user_id:ME.id,slug},{onConflict:"user_id,slug"});
  else await SB.from("favorites").delete().eq("user_id",ME.id).eq("slug",slug);
}
if(SB){
  SB.auth.onAuthStateChange((ev)=>{
    if(ev==="PASSWORD_RECOVERY"){acctMode="reset";nav("/compte/");return;}
    if(ev==="SIGNED_IN"||ev==="SIGNED_OUT"||ev==="USER_UPDATED"){loadMe().then(()=>{authReady=true;const k=route();if(k==="compte"||k.startsWith("r-"))render(k,false,true);});}
  });
  loadMe().then(()=>{authReady=true;const k=route();if(k==="compte")render(k,false,true);}).catch(()=>{authReady=true;});
}

/* ---------- Statistiques anonymes (avec accord du visiteur) ---------- */
function track(slug,kind){if(!SB||!slug||slug==="exemple"||store.get("miette-consent")!=="stats")return;SB.rpc("track",{p_slug:slug,p_kind:kind}).then(()=>{},()=>{});}
document.addEventListener("click",e=>{const k=route();if(!k.startsWith("r-"))return;const sl=k.slice(2);
  if(e.target.closest('a[href^="tel:"]'))track(sl,"appel");
  else if(e.target.closest('a[href*="google.com/maps"]'))track(sl,"itineraire");
  else if(e.target.closest("[data-pdf]"))track(sl,"menu");
  else if(e.target.closest("[data-link]"))track(sl,"lien");},true);
/* ---------- Offre Miette : validation au restaurant ---------- */
const MONTHS=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
const pad2=n=>String(n).padStart(2,"0");
const fmtDay=ts=>{const d=new Date(ts);return `${pad2(d.getDate())}/${pad2(d.getMonth()+1)}/${d.getFullYear()}`};
const fmtHour=ts=>{const d=new Date(ts);return `${pad2(d.getHours())}h${pad2(d.getMinutes())}`};
function offersThisMonth(u){const n=new Date();return (u&&u.offers||[]).filter(o=>{if(!o.ts)return false;const d=new Date(o.ts);return d.getMonth()===n.getMonth()&&d.getFullYear()===n.getFullYear();});}
function nextMonthLabel(){const n=new Date();return "1er "+MONTHS[(n.getMonth()+1)%12];}
let omClock=null,omPin="",omSlug=null,omBusy=false;
function omEl(){let m=$("#om");if(!m){m=document.createElement("div");m.id="om";m.hidden=true;m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");m.setAttribute("aria-labelledby","om-t");m.innerHTML='<div class="om-sheet" tabindex="-1"></div>';document.body.appendChild(m);
  m.addEventListener("click",e=>{if(e.target===m)closeOffer()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!m.hidden)closeOffer()});}return m;}
function closeOffer(){const m=omEl();m.hidden=true;m.className="";clearInterval(omClock);omClock=null;document.body.style.overflow="";const r=bySlug[omSlug];if(r&&route()==="r-"+r.slug)render("r-"+r.slug,false,true);}
function omShow(html,cls=""){const m=omEl();m.className=cls;m.hidden=false;document.body.style.overflow="hidden";const sh=$(".om-sheet",m);sh.innerHTML=`<button type="button" class="om-x" aria-label="Fermer">×</button>${html}`;$(".om-x",sh).onclick=closeOffer;sh.focus();return sh;}
function dots(m){return `<span class="om-dots">${[0,1,2].map(i=>`<i class="${i<m?"on":""}"></i>`).join("")}</span>`}
function openOffer(r){
  omSlug=r.slug;clearInterval(omClock);
  if(r.example){omShow(`<p class="om-eyebrow">Offre Miette · fiche d'exemple</p><h2 id="om-t">Comment ça marche</h2><ol class="om-steps"><li>Le client ouvre la fiche et appuie sur « Profiter de mon Offre Miette ».</li><li>Il tend son téléphone au serveur.</li><li>Le serveur tape le code à 4 chiffres du restaurant : l'offre est validée, avec l'heure en direct.</li></ol><p class="om-small" style="margin-top:12px">1 fois par mois et par restaurant, 3 restaurants différents par mois au maximum. Les règles sont vérifiées par Miette, pas par votre équipe.</p>`);return;}
  if(!SB){omShow(`<p class="om-eyebrow">Offre Miette · ${r.name}</p><h2 id="om-t">Bientôt disponible</h2><p>Les comptes Miette ouvrent très bientôt. En attendant, dites simplement que vous venez de Miette en commandant.</p>`);return;}
  const u=userGet();
  if(!u){const sh=omShow(`<p class="om-eyebrow">Offre Miette · ${r.name}</p><h2 id="om-t">Réservée aux membres Miette</h2><p>Avec un compte Miette gratuit, profitez d'une attention offerte <b>1 fois par mois dans ce restaurant</b>, jusqu'à <b>3 restaurants différents par mois</b>.</p><div class="om-acts"><a class="btn btn-primary" href="/compte/" id="om-login">Créer mon compte ou me connecter</a></div>`);
    $("#om-login",sh).addEventListener("click",()=>{const m=omEl();m.hidden=true;document.body.style.overflow="";});return;}
  const month=offersThisMonth(u),used=month.length,here=month.find(o=>o.slug===r.slug);
  const blk=(u.block||{})[r.slug];
  if(here){omShow(`<p class="om-eyebrow">Offre Miette · ${r.name}</p><h2 id="om-t">Déjà profité ce mois-ci</h2><p>Vous avez utilisé votre Offre Miette ici le <b>${fmtDay(here.ts)} à ${fmtHour(here.ts)}</b>. Elle sera de nouveau disponible dans ce restaurant à partir du <b>${nextMonthLabel()}</b>.</p><div class="om-count">${dots(used)}<span><b>${used} sur 3</b> utilisée${used>1?"s":""} en ${MONTHS[new Date().getMonth()]}</span></div>`);return;}
  if(used>=3){omShow(`<p class="om-eyebrow">Offre Miette</p><h2 id="om-t">Vos 3 offres du mois sont utilisées</h2><p>Vous avez profité de l'Offre Miette dans 3 restaurants ce mois-ci : ${month.map(o=>bySlug[o.slug]?bySlug[o.slug].name:"").filter(Boolean).join(", ")}. Rendez-vous le <b>${nextMonthLabel()}</b> pour de nouvelles offres.</p><div class="om-count">${dots(3)}<span><b>3 sur 3</b></span></div>`);return;}
  if(blk&&blk>Date.now()){const min=Math.ceil((blk-Date.now())/60000);omShow(`<p class="om-eyebrow">Offre Miette · ${r.name}</p><h2 id="om-t">Validation bloquée</h2><p>Trop de codes incorrects. Réessayez dans <b>${min} minute${min>1?"s":""}</b> en demandant au serveur de taper le code du restaurant.</p>`);return;}
  const left=3-used;
  const sh=omShow(`<p class="om-eyebrow">Offre Miette · ${r.name}</p><h2 id="om-t">Une attention offerte avec votre repas</h2>
    <div class="om-count">${dots(used)}<span>Il vous reste <b>${left} offre${left>1?"s":""}</b> ce mois-ci</span></div>
    <ol class="om-steps"><li>Commandez votre repas.</li><li>Tendez votre téléphone au serveur.</li><li>Il tape le code du restaurant : c'est validé.</li></ol>
    <button type="button" class="btn btn-primary om-go" id="om-go">Tendre mon téléphone au serveur</button>`);
  $("#om-go",sh).onclick=()=>pinStep(r);
}
function pinStep(r,msg=""){
  omPin="";omBusy=false;
  const sh=omShow(`<p class="om-eyebrow">À faire par le serveur</p><h2 id="om-t">Tapez le code du restaurant</h2>
    <div class="om-pin" aria-live="polite"><i></i><i></i><i></i><i></i></div>
    <p class="om-msg" role="alert">${msg}</p>
    <div class="om-pad">${[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map(k=>k===""?"<span></span>":`<button type="button" data-k="${k}" aria-label="${k==="⌫"?"Effacer":k}">${k}</button>`).join("")}</div>
    <p class="om-hint">Seule l'équipe du restaurant connaît ce code.</p>`,"om-pinmode");
  const show=()=>$$(".om-pin i",sh).forEach((d,i)=>d.classList.toggle("on",i<omPin.length));
  $$("[data-k]",sh).forEach(b=>b.onclick=()=>{if(omBusy)return;const k=b.dataset.k;if(k==="⌫"){omPin=omPin.slice(0,-1);show();return;}if(omPin.length>=4)return;omPin+=k;show();if(omPin.length===4)setTimeout(()=>checkPin(r),180);});
}
async function checkPin(r){
  omBusy=true;const m=$(".om-msg");if(m)m.textContent="Vérification…";
  let res;
  try{const {data,error}=await SB.rpc("claim_offer",{p_slug:r.slug,p_pin:omPin});if(error)throw error;res=data;}
  catch(e){pinStep(r,"Connexion impossible. Vérifiez le réseau et réessayez.");return;}
  await loadMe();
  if(res.ok){successStep(r,new Date(res.validated_at).getTime());return;}
  if(res.reason==="pin"){pinStep(r,`Code incorrect. Encore ${res.left} essai${res.left>1?"s":""}.`);const pin=$(".om-pin");if(pin)pin.classList.add("shake");return;}
  if(res.reason==="blocked"){omShow(`<p class="om-eyebrow">Offre Miette · ${r.name}</p><h2 id="om-t">Validation bloquée 15 minutes</h2><p>3 codes incorrects d'affilée. Pour éviter les essais au hasard, la validation est bloquée 15 minutes.</p>`);return;}
  openOffer(r); // déjà utilisée ou 3 offres atteintes : on affiche l'écran correspondant
}
function successStep(r,ts){
  const u=userGet();const used=offersThisMonth(u).length;const left=Math.max(0,3-used);
  const sh=omShow(`<div class="om-ok-in"><div class="om-check" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M14 27l8 8 16-17"/></svg></div>
    <p class="om-eyebrow">Offre Miette</p><h2 id="om-t">Offre validée</h2>
    <p class="om-resto">${r.name}</p><p>Une attention offerte avec votre repas</p>
    <p class="om-live"><span class="om-dot"></span><span id="om-clock"></span></p>
    <p class="om-small">Validée à ${fmtHour(ts)} par l'équipe du restaurant · Il vous reste ${left} offre${left>1?"s":""} ce mois-ci</p>
    <button type="button" class="btn om-close" id="om-close">Fermer</button></div>`,"om-ok");
  const days=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
  const tick=()=>{const d=new Date();const c=$("#om-clock");if(c)c.textContent=`${days[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} · ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;};
  tick();omClock=setInterval(tick,1000);$("#om-close",sh).onclick=closeOffer;
}

/* compte client */

const UICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">';
const escH=t=>String(t||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function perksHTML(){return `<div class="perks rv d1">
        <h2>Avec votre compte</h2>
        <div class="perk"><span class="perk-ic">${svg("tart",4)}</span><div><b>Vos restaurants favoris</b><p class="muted">Touchez le cœur sur une fiche, retrouvez-la ici sur tous vos appareils.</p></div></div>
        <div class="perk"><span class="perk-ic">${svg("gift",4)}</span><div><b>Vos avantages Offre Miette</b><p class="muted">Un avantage dans vos restaurants préférés, validé sur place en quelques secondes.</p></div></div>
        <div class="perk"><span class="perk-ic">${svg("plate",4)}</span><div><b>Les nouveautés près de chez vous</b><p class="muted">Soyez prévenu quand un restaurant arrive dans votre commune.</p></div></div>
        ${favs.size?`<p class="notice">Vous avez déjà <b>${favs.size} favori${favs.size>1?"s":""}</b> sur cet appareil. Ils seront rattachés à votre compte.</p>`:""}
      </div>`;}
function pageAccount(){
  const u=userGet(); const list=R.filter(r=>favs.has(r.slug));
  const head=`<p class="crumbs"><a href="/">Accueil</a> › Mon compte</p>`;
  const top=`<div class="wrap page-head">${head}<h1 class="rv">Mon compte Miette</h1><p class="muted rv d1" style="margin-top:12px;max-width:40em">Gardez vos restaurants préférés sous la main et profitez de vos avantages Miette.</p></div>`;
  if(!SB) return top+`<div class="wrap acct-grid"><div class="box auth rv"><h2 style="font-size:1.6rem">Ouverture très prochaine</h2><p class="muted">Les comptes Miette ouvrent dans quelques jours. Revenez bientôt pour créer le vôtre gratuitement.</p></div>${perksHTML()}</div>`;
  if(!authReady) return top+`<div class="wrap"><p class="muted">Chargement de votre compte…</p></div>`;
  if(acctMode==="reset"||!u){
    const mode=acctMode;
    if(mode==="forgot"||mode==="reset"){
      return top+`<div class="wrap acct-grid"><div class="box auth rv">
        <h2 style="font-size:1.6rem">${mode==="forgot"?"Mot de passe oublié":"Nouveau mot de passe"}</h2>
        <form class="form" id="acct-form" novalidate style="grid-template-columns:1fr">
          ${mode==="forgot"?`<label>E-mail<input class="field" id="a-mail" type="email" autocomplete="email" required></label>`:`<p class="muted" style="margin:0">Choisissez votre nouveau mot de passe (8 caractères minimum).</p><label>Nouveau mot de passe<input class="field" id="a-pass" type="password" autocomplete="new-password" required></label><label>Confirmez le mot de passe<input class="field" id="a-pass2" type="password" autocomplete="new-password" required></label>`}
          <button class="btn btn-primary" type="submit" style="justify-content:center">${mode==="forgot"?"Recevoir le lien":"Enregistrer"}</button>
          <p id="a-err" class="muted" role="alert"></p>
        </form>
        <button type="button" class="reset" data-mode="login" style="justify-self:start">${mode==="reset"?"Annuler":"Retour à la connexion"}</button>
      </div>${perksHTML()}</div>`;
    }
    const su=mode==="signup";
    return top+`<div class="wrap acct-grid">
      <div class="box auth rv">
        <div class="view-sw" role="group" aria-label="Choix" style="justify-self:start"><button type="button" data-mode="signup" aria-pressed="${su}">Créer un compte</button><button type="button" data-mode="login" aria-pressed="${!su}">Se connecter</button></div>
        <form class="form" id="acct-form" novalidate style="grid-template-columns:1fr">
          ${su?`<label>Prénom<input class="field" id="a-prenom" autocomplete="given-name" required></label>`:""}
          <label>E-mail<input class="field" id="a-mail" type="email" autocomplete="email" required></label>
          <label>Mot de passe<input class="field" id="a-pass" type="password" autocomplete="${su?"new-password":"current-password"}" required></label>
          ${su?`<label>Ma commune (facultatif)${COMMUNE_DL}<input class="field" id="a-commune" list="dl-communes" autocomplete="address-level2" placeholder="Pour voir les nouveautés près de chez vous"></label>
          <label class="check" style="display:flex;gap:10px;align-items:flex-start;font-weight:500"><input type="checkbox" id="a-cgu" required> J'accepte les <a href="/conditions-generales/" style="color:var(--orange-ink)">conditions générales</a> et la <a href="/confidentialite/" style="color:var(--orange-ink)">politique de confidentialité</a>.</label>`:""}
          <button class="btn btn-primary" type="submit" style="justify-content:center">${su?"Créer mon compte":"Me connecter"}</button>
          <p id="a-err" class="muted" role="alert"></p>
        </form>
        ${su?"":`<button type="button" class="reset" data-mode="forgot" style="justify-self:start">Mot de passe oublié ?</button>`}
      </div>
      ${perksHTML()}
    </div>`;
  }
  return `<div class="wrap page-head">${head}<h1 class="rv">Bonjour ${escH(u.prenom)} !</h1><p class="muted rv d1" style="margin-top:12px">Votre espace Miette.</p></div>
  <div class="wrap acct-dash">
    <section class="rv" aria-labelledby="fav-t">
      <div class="res-bar"><h2 id="fav-t" style="font-size:clamp(1.8rem,3.6vw,2.4rem)">Mes restaurants favoris <span class="fav-n" style="font-family:var(--f-body);font-size:.9rem;vertical-align:middle">${list.length}</span></h2><a class="btn btn-ghost" href="/annuaire/">Trouver d'autres restaurants</a></div>
      ${list.length?`<div class="grid">${list.map((r,i)=>`<div class="fav-item">${card(r,i)}<button type="button" class="heart sm" data-unfav="${r.slug}" aria-pressed="true" aria-label="Retirer ${r.name} de mes favoris"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8.2 3.4 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.6 0 5.5 3.7 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg></button></div>`).join("")}</div>`
      :`<div class="empty"><div class="mascot" style="width:110px;height:140px;margin:0 auto 14px"></div><h3>Pas encore de favori</h3><p class="muted" style="margin-top:8px">${R.length?"Touchez le cœur à côté du nom d'un restaurant pour le retrouver ici.":"Les premiers restaurants arrivent très bientôt. Touchez le cœur sur leur fiche pour les retrouver ici."}</p><a class="btn btn-primary" style="margin-top:16px" href="/annuaire/">Parcourir l'annuaire</a></div>`}
      ${R.length?nearBlock(u):""}
    </section>
    <aside class="info rv d1">
      <div class="box"><h3>Mes Offres Miette</h3>
        <div class="soon">${(()=>{const m=offersThisMonth(u).length;return `<div class="om-count"><span class="om-dots">${[0,1,2].map(i=>`<i class="${i<m?"on":""}"></i>`).join("")}</span><span><b>${m} sur 3</b> utilisée${m>1?"s":""} en ${MONTHS[new Date().getMonth()]}</span></div>`})()}<p>Au restaurant, ouvrez sa fiche et appuyez sur « Profiter de mon Offre Miette ». Le serveur valide avec le code du restaurant.</p></div>
        ${(u.offers&&u.offers.length)?`<p class="muted" style="font-size:.88rem"><b style="color:var(--ink)">Historique</b></p><ul class="hist">${u.offers.map(o=>{const r=bySlug[o.slug];return r?`<li><a href="/restaurants/${r.slug}/">${r.name}</a><span>${r.commune}</span><time>${fmtDay(o.ts)}</time></li>`:""}).join("")}</ul>`
          :`<p class="muted" style="font-size:.88rem">Les avantages que vous utiliserez apparaîtront ici, avec la date et le restaurant.</p>`}
      </div>
      <div class="box"><h3>Mes informations</h3>
        <dl class="kv"><dt>Prénom</dt><dd>${escH(u.prenom)}</dd><dt>E-mail</dt><dd>${escH(u.email)}</dd><dt>Commune</dt><dd>${escH(u.commune)||"Non renseignée"}</dd></dl>
        <button type="button" class="small-btn" id="a-edit" style="justify-self:start">Modifier</button></div>
      <div class="box"><h3>Préférences</h3><label class="check" style="display:flex;gap:10px;align-items:flex-start"><input type="checkbox" id="a-news" ${u.news?"checked":""}> Me prévenir quand un nouveau restaurant arrive près de chez moi</label></div>
      <button type="button" class="reset" id="a-logout" style="justify-self:start">Se déconnecter</button>
      <button type="button" class="reset" id="a-delete" style="justify-self:start;color:#a12b1a">Supprimer mon compte</button>
    </aside>
  </div>`;
}
function nearBlock(u){
  const here=placeOf(u.commune);
  let list=R.filter(r=>!favs.has(r.slug)).map(r=>({r,d:here?km(here,[r.lat,r.lng]):null}));
  if(here) list=list.filter(x=>x.d<=25).sort((a,b)=>b.r.added.localeCompare(a.r.added)||a.d-b.d);
  else list.sort((a,b)=>b.r.added.localeCompare(a.r.added));
  list=list.slice(0,3);
  const title=here?`Nouveautés près de ${escH(u.commune)}`:"Les derniers arrivés sur Miette";
  return `<div class="near"><div class="res-bar"><h2 style="font-size:clamp(1.8rem,3.6vw,2.4rem)">${title}</h2>${here?`<span class="muted" style="font-size:.9rem">À moins de 25 km</span>`:`<button type="button" class="small-btn" id="a-setc">Indiquer ma commune</button>`}</div>
    ${list.length?`<div class="grid">${list.map((x,i)=>`<div class="fav-item"><span class="new-tag">Nouveau · ${fmtDate(x.r.added)}${x.d!=null?` · à ${x.d<1?"moins d'1":Math.round(x.d)} km`:""}</span>${card(x.r,i)}</div>`).join("")}</div>`
      :`<div class="empty"><p class="muted">Pas de nouveau restaurant près de chez vous pour l'instant. Vous serez prévenu dès qu'il y en aura un.</p></div>`}</div>`;
}
const AUTH_ERR=m=>{m=(m||"").toLowerCase();
  if(m.includes("invalid login"))return "E-mail ou mot de passe incorrect.";
  if(m.includes("already registered")||m.includes("already been registered"))return "Un compte existe déjà avec cet e-mail. Connectez-vous.";
  if(m.includes("email not confirmed"))return "Confirmez d'abord votre adresse avec le lien reçu par e-mail.";
  if(m.includes("rate limit")||m.includes("too many"))return "Trop de tentatives. Réessayez dans quelques minutes.";
  if(m.includes("password"))return "Mot de passe trop faible : 8 caractères minimum.";
  return "Une erreur est survenue. Réessayez dans un instant.";};
const EYE_ON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
function pwEyes(root){
  $$('input[type="password"]',root).forEach(inp=>{
    if(inp.parentElement.classList.contains("pw"))return;
    const w=document.createElement("span");w.className="pw";inp.parentNode.insertBefore(w,inp);w.appendChild(inp);
    const b=document.createElement("button");b.type="button";b.className="pw-eye";b.setAttribute("aria-label","Afficher le mot de passe");b.setAttribute("aria-pressed","false");b.innerHTML=EYE_ON;
    b.onclick=()=>{const show=inp.type==="password";inp.type=show?"text":"password";b.innerHTML=show?EYE_OFF:EYE_ON;b.setAttribute("aria-pressed",show);b.setAttribute("aria-label",show?"Masquer le mot de passe":"Afficher le mot de passe");inp.focus();};
    w.appendChild(b);
  });
}
function bindAccount(){
  pwEyes(document);
  const sc=$("#a-setc");if(sc)sc.onclick=()=>{const ed=$("#a-edit");if(ed){ed.scrollIntoView({behavior:"smooth",block:"center"});ed.click();}};
  $$("[data-mode]").forEach(b=>b.onclick=()=>{acctMode=b.dataset.mode;render("compte",false,true)});
  const f=$("#acct-form"), err=t=>{const e=$("#a-err");if(e)e.textContent=t;};
  if(f)f.addEventListener("submit",async e=>{e.preventDefault();
    const btn=f.querySelector('button[type="submit"]');
    const mailEl=$("#a-mail"),passEl=$("#a-pass"),pr=$("#a-prenom");
    const mail=mailEl?mailEl.value.trim():"",pass=passEl?passEl.value:"";
    if(pr&&!pr.value.trim()){err("Indiquez votre prénom.");pr.focus();return;}
    if(mailEl&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)){err("L'adresse e-mail semble incomplète (exemple : nom@mail.fr).");mailEl.focus();return;}
    if(passEl&&pass.length<8){err("Le mot de passe doit contenir au moins 8 caractères.");passEl.focus();return;}
    if(acctMode==="reset"&&pass!==$("#a-pass2").value){err("Les deux mots de passe ne sont pas identiques.");$("#a-pass2").focus();return;}
    if(acctMode==="signup"&&!$("#a-cgu").checked){err("Cochez la case pour accepter les conditions.");return;}
    btn.disabled=true;err("Un instant…");
    try{
      if(acctMode==="signup"){
        const {data,error}=await SB.auth.signUp({email:mail,password:pass,options:{data:{prenom:pr.value.trim(),commune:($("#a-commune").value||"").trim()},emailRedirectTo:location.origin+"/compte/"}});
        if(error)throw error;
        if(!data.session){f.hidden=true;err("");f.insertAdjacentHTML("afterend",`<p class="notice"><b>Plus qu'une étape !</b> Nous vous avons envoyé un e-mail à ${escH(mail)}. Cliquez sur le lien pour activer votre compte.</p>`);return;}
        toast("Compte créé. Bienvenue !");
      }else if(acctMode==="login"){
        const {error}=await SB.auth.signInWithPassword({email:mail,password:pass});if(error)throw error;
        toast("Vous êtes connecté.");
      }else if(acctMode==="forgot"){
        const {error}=await SB.auth.resetPasswordForEmail(mail,{redirectTo:location.origin+"/compte/?reset=1"});if(error)throw error;
        f.hidden=true;err("");f.insertAdjacentHTML("afterend",`<p class="notice">Si un compte existe pour ${escH(mail)}, vous allez recevoir un lien pour choisir un nouveau mot de passe.</p>`);return;
      }else if(acctMode==="reset"){
        const {data:{session}}=await SB.auth.getSession();
        if(!session){err("Ce lien a expiré. Refaites une demande « Mot de passe oublié ».");btn.disabled=false;return;}
        const {error}=await SB.auth.updateUser({password:pass});if(error)throw error;
        acctMode="login";history.replaceState(null,"","/compte/");try{sessionStorage.removeItem("miette-reset")}catch(e){}toast("Votre nouveau mot de passe est enregistré.");
      }
    }catch(x){err(AUTH_ERR(x.message));btn.disabled=false;return;}
    await loadMe();authReady=true;render("compte");
  });
  $$("[data-unfav]").forEach(b=>b.onclick=()=>{const s=b.dataset.unfav;favs.delete(s);store.set("miette-favs",JSON.stringify([...favs]));updFavN();syncFav(s,false);toast("Retiré de vos favoris.");render("compte",false,true)});
  const ed=$("#a-edit");if(ed)ed.onclick=()=>{const u=userGet();const box=ed.closest(".box");
    box.innerHTML=`<h3>Mes informations</h3><form class="form" id="a-editf" style="grid-template-columns:1fr"><label>Prénom<input class="field" id="e-prenom" value="${escH(u.prenom)}"></label><label>Commune${COMMUNE_DL}<input class="field" id="e-commune" list="dl-communes" value="${escH(u.commune)}" placeholder="Exemple : Royan"></label><div style="display:flex;gap:8px"><button class="btn btn-primary" type="submit">Enregistrer</button><button class="btn btn-ghost" type="button" id="e-cancel">Annuler</button></div></form>`;
    $("#e-commune").focus();
    $("#e-cancel").onclick=()=>render("compte",false,true);
    $("#a-editf").onsubmit=async e=>{e.preventDefault();const prenom=$("#e-prenom").value.trim()||u.prenom,commune=$("#e-commune").value.trim();
      const {error}=await SB.from("profiles").update({prenom,commune}).eq("id",u.id);
      if(error){toast("Impossible d'enregistrer. Réessayez.");return;}
      u.prenom=prenom;u.commune=commune;toast("Informations enregistrées.");render("compte",false,true);};};
  const nw=$("#a-news");if(nw)nw.onchange=async()=>{const u=userGet();const {error}=await SB.from("profiles").update({news:nw.checked}).eq("id",u.id);if(error){toast("Impossible d'enregistrer. Réessayez.");nw.checked=!nw.checked;return;}u.news=nw.checked;toast(nw.checked?"C'est noté, vous serez prévenu.":"Vous ne serez plus prévenu.")};
  const lo=$("#a-logout");if(lo)lo.onclick=async()=>{await SB.auth.signOut();ME=null;acctMode="login";toast("Vous êtes déconnecté.");render("compte")};
  const del=$("#a-delete");if(del)del.onclick=()=>{const box=del;box.insertAdjacentHTML("afterend",`<div class="box" id="del-box"><h3>Supprimer mon compte ?</h3><p class="muted" style="font-size:.92rem">Vos favoris et votre historique d'Offres Miette seront effacés définitivement.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary" type="button" id="del-yes" style="background:#a12b1a">Oui, supprimer</button><button class="btn btn-ghost" type="button" id="del-no">Annuler</button></div></div>`);del.hidden=true;
    $("#del-no").onclick=()=>render("compte",false,true);
    $("#del-yes").onclick=async()=>{const {error}=await SB.rpc("delete_my_account");if(error){toast("La suppression a échoué. Écrivez-nous à miettefoodclub@gmail.com.");return;}await SB.auth.signOut();ME=null;favs.clear();store.set("miette-favs","[]");updFavN();acctMode="signup";toast("Votre compte a été supprimé.");render("compte");};};
}

function updFavN(){const n=$("#fav-n");if(!n)return;n.textContent=favs.size;n.hidden=!favs.size;}

/* pages légales (modèles à compléter) */
const T = s=>`<span class="todo">[${s}]</span>`;
const MAIL='<b>miettefoodclub@gmail.com</b>';
const MAJ=`<p class="muted" style="font-size:.88rem">Dernière mise à jour : 14 novembre 2026</p>`;
const LEGAL = {
 mentions:["Mentions légales",`${MAJ}
<p>Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), voici les informations sur l'éditeur et l'hébergeur du site miettefoodclub.com.</p>
<h2>Éditeur du site</h2>
<p>Le site miettefoodclub.com est édité par <b>Soline VALADON EI</b> (entrepreneur individuel, micro-entreprise), exerçant sous le nom commercial <b>Miette - FoodClub</b>.</p>
<ul><li>Adresse : 33 rue de l'Atlantique, 17530 Arvert</li><li>SIRET : 948 614 094 00027 (SIREN 948 614 094, immatriculation au Registre national des entreprises)</li><li>TVA non applicable, article 293 B du Code général des impôts</li><li>E-mail : ${MAIL}</li><li>Téléphone : 06 24 24 32 98</li></ul>
<p>Directrice de la publication : Soline VALADON.</p>
<h2>Fiches payantes et classement</h2>
<p>Toutes les fiches publiées sur Miette sont celles d'établissements partenaires abonnés. Les fiches « À la une » sont des mises en avant payantes (forfait Premium), signalées par le mot « annonce ». Le détail figure sur la page <a href="/classement/">Fonctionnement et classement des fiches</a>.</p>
<h2>Hébergement</h2>
<p>GitHub, Inc. (service GitHub Pages), 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis. Téléphone : +1 877 448 4820. Site : github.com.</p>
<h2>Objet du site</h2>
<p>Miette - FoodClub est un annuaire en ligne des restaurants et foodtrucks de Charente-Maritime. Il présente pour chaque établissement partenaire ses informations pratiques et sa carte. Le site n'affiche ni notes ni avis de clients et ne prend aucune réservation ni commande.</p>
<h2>Informations sur les restaurants</h2>
<p>Les cartes, prix, horaires et photos sont fournis par les établissements partenaires. Ils sont vérifiés à la date indiquée sur chaque fiche (« Carte vérifiée le… »), mais peuvent évoluer entre deux mises à jour. La fiche « Exemple » est fictive : elle sert uniquement à montrer à quoi ressemble une fiche Miette. Seules les informations données par l'établissement font foi : en cas de doute, contactez-le directement. Miette ne peut être tenue responsable d'un écart entre la fiche et la situation réelle.</p>
<h2>Propriété intellectuelle</h2>
<p>Le nom Miette - FoodClub, le logo, les illustrations, les textes et la mise en page du site sont la propriété de l'éditeur. Toute reproduction, totale ou partielle, sans autorisation écrite est interdite.</p>
<p>Les cartes, menus, logos et photos des établissements restent la propriété de chaque établissement ou de leurs auteurs. Ils sont diffusés sur Miette avec leur autorisation.</p>
<p>Polices utilisées : Beth Ellen et Annie Use Your Telescope (licence SIL Open Font License), Figtree (licence SIL Open Font License).</p>
<h2>Liens vers d'autres sites</h2>
<p>Les liens vers les sites, réseaux sociaux ou outils de réservation des établissements sont fournis pour faciliter votre recherche. Miette n'a aucun contrôle sur ces sites et n'est pas responsable de leur contenu.</p>
<h2>Données personnelles et cookies</h2>
<p>Voir la <a href="/confidentialite/">politique de confidentialité</a> et la page <a href="/cookies/">cookies</a>.</p>
<h2>Contact</h2>
<p>Pour toute question ou pour signaler une erreur sur une fiche : ${MAIL}.</p>`],

 confidentialite:["Politique de confidentialité",`${MAJ}
<p>Cette page explique quelles données personnelles Miette - FoodClub collecte, pourquoi, combien de temps elles sont gardées et comment exercer vos droits, conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.</p>
<h2>Responsable du traitement</h2>
<p>Soline VALADON, Miette - FoodClub, 33 rue de l'Atlantique, 17530 Arvert. Contact : ${MAIL}, 06 24 24 32 98.</p>
<h2>Les données collectées et leur usage</h2>
<p><b>1. Formulaire « Référencer mon restaurant »</b><br>Données : nom de l'établissement, type (restaurant ou foodtruck), commune, nom, e-mail, téléphone, forfait souhaité, message.<br>Usage : vous recontacter pour présenter Miette et préparer votre fiche.<br>Base légale : mesures précontractuelles prises à votre demande.<br>Les demandes sont enregistrées dans la base de données du site (Supabase), puis l'éditeur en est averti par un e-mail envoyé par Brevo. Durée : 3 ans après le dernier contact si aucun contrat n'est signé.</p>
<p><b>2. Établissements partenaires</b><br>Données : coordonnées du contact, informations de facturation, échanges par e-mail.<br>Usage : gestion de l'abonnement, mise à jour de la fiche, envoi du rapport de statistiques trimestriel.<br>Base légale : exécution du contrat ; obligations comptables.<br>Durée : pendant le contrat, puis 5 ans ; les factures sont gardées 10 ans (obligation légale).</p>
<p><b>3. Comptes clients</b><br>Données : prénom, e-mail, mot de passe chiffré, commune (facultative), restaurants favoris, préférences de notification, historique des Offres Miette utilisées.<br>Usage : gérer votre compte, vos favoris et vos avantages ; vous prévenir par e-mail des nouveaux restaurants de votre commune et des communes voisines si vous l'avez demandé (chaque e-mail contient un lien pour ne plus les recevoir).<br>Base légale : exécution du service que vous demandez ; votre consentement pour les notifications.<br>Durée : tant que le compte est actif ; il est supprimé après 3 ans sans connexion, après un e-mail de prévenance. Vous pouvez aussi supprimer votre compte vous-même à tout moment depuis « Mon compte » : vos données (profil, favoris, historique des Offres Miette) sont alors effacées immédiatement. L'historique des Offres Miette sert à appliquer les règles de l'offre (une fois par mois et par établissement, trois établissements par mois) ; les tentatives de code erronées sont enregistrées pour la sécurité et ne servent qu'à bloquer la validation pendant 15 minutes après trois erreurs.</p>
<p><b>4. Statistiques de visite</b><br>Miette compte elle-même, sans outil de mesure d'audience tiers et sans cookie, le nombre de visites de chaque fiche et le nombre de clics sur le téléphone, le site ou le menu d'un établissement. Seuls des totaux par fiche et par jour sont enregistrés : aucune adresse IP, aucun identifiant, aucun profil de visiteur n'est conservé.<br>Usage : produire le rapport de statistiques envoyé chaque trimestre aux établissements, et améliorer le site.<br>Base légale : intérêt légitime de l'éditeur à mesurer l'audience de son service.<br>Durée : les totaux sont conservés 25 mois au maximum.</p>
<h2>Qui reçoit ces données</h2>
<p>Seul l'éditeur de Miette y a accès. Elles ne sont jamais vendues ni louées. Elles sont hébergées ou traitées par des prestataires techniques qui agissent pour son compte :</p>
<ul><li>GitHub, Inc. (hébergement du site, États-Unis)</li><li>Supabase, Inc. (base de données : comptes clients, favoris, Offres Miette, demandes de référencement et statistiques de visite ; données stockées dans l'Union européenne, en Irlande)</li><li>Brevo (Sendinblue SAS, France : envoi des e-mails liés aux comptes, comme la réinitialisation du mot de passe, des alertes « nouveau restaurant près de chez vous » et de l'avis de nouvelle demande de référencement à l'éditeur)</li><li>Google (messagerie Gmail et affichage de la police Figtree, États-Unis)</li><li>jsDelivr (diffusion d'une bibliothèque technique nécessaire aux comptes)</li></ul>
<p>Les transferts vers les États-Unis vers GitHub et Google reposent sur le cadre de protection des données UE–États-Unis (Data Privacy Framework), auquel ces sociétés ont adhéré. jsDelivr est un réseau mondial de diffusion de fichiers publics : il ne reçoit que les informations techniques de connexion (adresse IP, navigateur) nécessaires pour vous envoyer le fichier.</p>
<h2>Vos droits</h2>
<p>Vous pouvez à tout moment demander l'accès à vos données, leur rectification, leur effacement, leur portabilité, la limitation de leur traitement, ou vous opposer à leur traitement. Vous pouvez retirer votre consentement à tout moment, et donner des directives sur le sort de vos données après votre décès.</p>
<p>Écrivez à ${MAIL}. Une réponse vous sera apportée dans un délai d'un mois. Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (cnil.fr).</p>
<h2>Sécurité</h2>
<p>Le site est servi en connexion chiffrée (HTTPS). Les mots de passe des comptes sont chiffrés et ne sont jamais lisibles, même par l'éditeur.</p>
<h2>Mineurs</h2>
<p>La création d'un compte client est réservée aux personnes de 15 ans et plus.</p>`],

 cookies:["Cookies",`${MAJ}
<p>Un cookie est un petit fichier enregistré par votre navigateur. Miette en utilise très peu, et aucun à des fins publicitaires.</p>
<h2>Ce qui est utilisé sans votre accord (nécessaire au fonctionnement)</h2>
<ul><li><b>Votre choix sur le bandeau cookies</b>, pour ne pas vous le redemander à chaque page. Conservé 6 mois.</li><li><b>Vos favoris et votre session de compte</b>, enregistrés dans votre navigateur pour que le site fonctionne. Supprimés quand vous vous déconnectez ou videz les données de votre navigateur.</li><li><b>L'animation d'accueil</b> : une simple indication que vous l'avez déjà vue pendant votre visite. Effacée à la fermeture de l'onglet.</li><li><b>Les fiches mises en avant sur l'accueil</b> : la liste des dernières fiches affichées, pour vous en montrer de nouvelles à chaque visite. Aucune donnée personnelle.</li></ul>
<h2>Statistiques de visite</h2>
<p>Miette compte les visites et les clics sur les fiches pour produire le rapport envoyé aux établissements. Ce comptage se fait sans cookie ni traceur, sans outil de mesure d'audience tiers, et sans conserver aucune donnée qui permettrait de vous identifier : seuls des totaux par fiche sont enregistrés. Vous pouvez néanmoins le refuser depuis le bandeau. Votre choix est redemandé tous les 6 mois, et refuser n'empêche pas d'utiliser le site.</p>
<h2>Contenus de sites tiers</h2>
<p>Quand vous cliquez sur un lien vers Instagram, Facebook, TikTok, un outil de réservation ou un itinéraire (Google Maps), vous quittez Miette. Ces sites appliquent leurs propres règles en matière de cookies.</p>
<h2>Changer d'avis</h2>
<p>Utilisez le lien « Gérer mes cookies » en bas de chaque page. Vous pouvez aussi supprimer les cookies depuis les réglages de votre navigateur.</p>`],

 cgv:["Conditions générales",`${MAJ}
<p>Ces conditions comportent deux parties : les conditions d'utilisation du site, qui s'appliquent à tous les visiteurs, et les conditions de vente des abonnements, qui s'appliquent aux établissements partenaires (restaurants et foodtrucks).</p>

<h2>Partie 1 · Conditions d'utilisation du site</h2>
<p><b>Accès.</b> Le site est gratuit et accessible à tous. L'éditeur peut le suspendre pour maintenance sans préavis.</p>
<p><b>Informations publiées.</b> Les fiches présentent les informations fournies par les établissements. Miette ne publie ni notes ni avis de clients. Les prix et horaires peuvent évoluer : l'établissement seul fait foi.</p>
<p><b>Compte client.</b> Le compte est personnel. Vous êtes responsable de la confidentialité de votre mot de passe. L'éditeur peut fermer un compte utilisé de façon abusive.</p>
<p><b>Offre Miette (côté client).</b> Les établissements signalés par le badge « Offre Miette » offrent une attention aux clients qui disent venir de la part de Miette, selon les conditions propres à chaque établissement (par exemple une offre par table, avec un repas). L'offre ne comprend jamais de boisson alcoolisée. Elle est réservée aux titulaires d'un compte Miette, limitée à une fois par mois dans un même établissement et à trois établissements différents par mois, et validée sur place par l'établissement avec son code. L'établissement peut la modifier ou l'arrêter à tout moment.</p>

<h2>Partie 2 · Conditions de vente des abonnements</h2>
<p><b>Prestataire.</b> Les abonnements sont proposés par Soline VALADON EI (entrepreneur individuel), exerçant sous le nom commercial Miette - FoodClub, 33 rue de l'Atlantique, 17530 Arvert, SIRET 948 614 094 00027.</p>
<p><b>Forfaits.</b> Miette Essentiel (34,90 € par mois), Miette Visibilité (49,90 € par mois) et Miette Premium (79,90 € par mois). TVA non applicable, article 293 B du CGI, dont le contenu est détaillé sur la page « Devenir partenaire ». Les mêmes forfaits s'appliquent aux foodtrucks.</p>
<p><b>Souscription.</b> L'abonnement est conclu après échange avec l'éditeur, par la signature d'un bon de commande ou l'acceptation écrite de ces conditions par e-mail.</p>
<p><b>Droit de rétractation.</b> Lorsque l'abonnement est signé en dehors des locaux de l'éditeur (par exemple dans l'établissement) avec un établissement qui emploie cinq salariés au plus, et que ce contrat n'entre pas dans le champ de son activité principale, l'établissement dispose d'un délai de 14 jours à compter de la signature pour se rétracter, sans avoir à donner de motif ni à payer de pénalité (articles L221-3 et L221-18 du Code de la consommation). Pour l'exercer, il suffit d'envoyer avant la fin de ce délai le formulaire ci-dessous, ou toute déclaration claire, par e-mail à ${MAIL} ou par courrier au 33 rue de l'Atlantique, 17530 Arvert. Les sommes déjà versées sont remboursées dans les 14 jours suivant la rétractation. Si l'établissement a demandé expressément que sa fiche soit mise en ligne avant la fin du délai, il reste redevable de la part de l'abonnement correspondant à la période écoulée jusqu'à sa rétractation (article L221-25).</p>
<p><b>Durée et résiliation.</b> L'abonnement est sans engagement de durée. Il démarre à la mise en ligne de la fiche et se poursuit de mois en mois. Il peut être résilié à tout moment par e-mail, avec un préavis d'un mois : le mois en cours au moment de la demande et le mois de préavis restent dus. Un échange personnel a lieu au bout d'un an.</p>
<p><b>Paiement.</b> L'abonnement est payable d'avance, chaque mois, au plus tard le 5 du mois concerné, par virement permanent mis en place par l'établissement. Une facture est émise chaque mois. TVA non applicable, article 293 B du CGI. Aucun escompte n'est accordé en cas de paiement anticipé. Tout retard de paiement entraîne de plein droit, dès le lendemain de la date d'échéance, des pénalités de retard égales à trois fois le taux d'intérêt légal, ainsi qu'une indemnité forfaitaire de 40 € pour frais de recouvrement (articles L441-10 et D441-5 du Code de commerce). La fiche peut être suspendue après une relance restée sans réponse pendant 15 jours.</p>
<p><b>Contenu fourni par l'établissement.</b> L'établissement fournit sa carte, ses photos, ses horaires et ses coordonnées. Il garantit qu'il détient les droits sur ces éléments et autorise Miette à les publier sur le site et sur ses réseaux sociaux pendant la durée de l'abonnement. Il reste responsable de l'exactitude de ses prix et informations.</p>
<p><b>Mises à jour.</b> Les modifications sont envoyées par e-mail à ${MAIL}. Une mise à jour correspond à une carte entière (changement de saison, menu spécial…) : 2 par an pour Essentiel, 4 pour Visibilité, 12 pour Premium. La correction d'une simple erreur est gratuite et ne compte pas dans ce nombre. Les mises à jour sont mises en ligne dans un délai de 7 jours au maximum après réception. Le rafraîchissement graphique d'une carte est une option sur devis.</p>
<p><b>Places Premium.</b> Le nombre d'établissements Premium est limité à 10. Au-delà, les demandes sont placées sur liste d'attente, par ordre d'arrivée.</p>
<p><b>Réseaux sociaux.</b> Les publications Instagram et TikTok prévues par les forfaits sont réalisées par l'éditeur, qui en choisit la forme et la date.</p>
<p><b>Offre Miette (côté établissement).</b> La participation est facultative. L'établissement définit avec l'éditeur ce qu'il offre et à quelles conditions. Il s'engage à honorer l'offre affichée sur sa fiche tant qu'il ne demande pas sa modification. Trois règles s'appliquent : les conditions de l'offre sont clairement affichées sur la fiche de l'établissement ; l'offre ne comprend jamais de boisson alcoolisée ; c'est l'établissement qui offre et qui en supporte le coût, Miette n'intervient ni dans l'offre ni dans son paiement.</p>
<p><b>Offre de lancement.</b> Les 15 premiers établissements inscrits bénéficient de 2 mois gratuits sur le forfait Miette Visibilité. À la fin de ces 2 mois, l'établissement n'a aucune obligation de souscrire un abonnement. Les 2 mois gratuits commencent à la signature du contrat. Si l'établissement ne souscrit pas d'abonnement à la fin de ces 2 mois, sa fiche est retirée du site. L'offre de lancement est limitée à une seule fois par établissement.</p>
<p><b>Statistiques.</b> Un rapport de statistiques est envoyé chaque trimestre par e-mail. Ces chiffres sont donnés à titre indicatif.</p>
<p><b>Responsabilité.</b> L'éditeur s'engage à mettre en œuvre les moyens nécessaires à la bonne diffusion de la fiche, sans garantie d'un nombre de visites ou de clients. Il ne peut être tenu responsable d'une interruption temporaire du site.</p>
<p><b>Résiliation pour manquement.</b> En cas de manquement grave de l'une des parties, l'autre peut résilier l'abonnement après une mise en demeure restée sans effet pendant 15 jours.</p>
<p><b>Données personnelles.</b> Voir la <a href="/confidentialite/">politique de confidentialité</a>.</p>
<p><b>Droit applicable.</b> Ces conditions sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action. À défaut, le litige sera porté devant les juridictions compétentes de La Rochelle, sous réserve des règles impératives applicables aux établissements bénéficiant du droit de rétractation.</p>
<h2>Annexe · Formulaire de rétractation</h2>
<p class="muted">À compléter et renvoyer uniquement si vous souhaitez vous rétracter du contrat, dans les cas prévus à l'article « Droit de rétractation ».</p>
<div style="border:1.5px dashed var(--line,#e7d6c3);border-radius:14px;padding:16px 18px">
<p>À l'attention de Soline VALADON EI, Miette - FoodClub, 33 rue de l'Atlantique, 17530 Arvert · ${MAIL}</p>
<p>Je / nous (*) vous notifie / notifions (*) par la présente ma / notre (*) rétractation du contrat portant sur la prestation de services ci-dessous :</p>
<ul><li>Abonnement Miette (forfait : …………………………)</li><li>Commandé le : …………………………</li><li>Nom de l'établissement et du signataire : …………………………</li><li>Adresse : …………………………</li><li>Signature (uniquement en cas d'envoi sur papier) : …………………………</li><li>Date : …………………………</li></ul>
<p class="muted">(*) Rayez la mention inutile.</p></div>`],
 classement:["Fonctionnement et classement des fiches",`${MAJ}
<p>Cette page explique quels établissements apparaissent sur Miette et dans quel ordre, conformément à l'article L111-7 du Code de la consommation.</p>
<h2>Qui apparaît sur Miette</h2>
<p>Miette ne présente que des <b>établissements partenaires</b> : des restaurants et foodtrucks qui ont souscrit un abonnement payant (forfaits Essentiel, Visibilité ou Premium) ou qui bénéficient de l'offre de lancement. Miette n'est donc pas un recensement complet : beaucoup d'établissements de Charente-Maritime n'y figurent pas.</p>
<p>Une fiche est publiée à la signature du contrat, une fois les informations de l'établissement reçues. Elle est retirée à la fin de l'abonnement, en cas d'impayé resté sans réponse 15 jours après une relance, en cas de manquement grave aux <a href="/conditions-generales/">conditions générales</a>, ou si l'établissement ferme définitivement.</p>
<h2>Ordre d'affichage</h2>
<ul>
<li><b>Annuaire</b> : les fiches « À la une » apparaissent en premier, puis toutes les autres par ordre alphabétique. La recherche et les filtres (commune, cuisine, prix, Offre Miette…) réduisent la liste sans changer cet ordre.</li>
<li><b>Carrousel « À la une » de l'accueil</b> : il ne présente que les fiches « À la une », dans un ordre tiré au hasard à chaque visite.</li>
<li><b>Grand bandeau de l'accueil</b> : quand il est affiché, il présente des fiches tirées au hasard parmi tous les établissements partenaires.</li>
<li><b>Foodtrucks</b> : les foodtrucks « À la une » apparaissent en premier.</li>
<li><b>« Près de chez vous » (compte client)</b> : les établissements à moins de 25 km de la commune indiquée, les plus récents d'abord.</li>
</ul>
<h2>Mises en avant payantes</h2>
<p>Le badge <b>« À la une · annonce »</b> signale une mise en avant payante : il correspond au forfait Premium (10 places au maximum). C'est la seule façon dont le prix payé par un établissement influence son classement. Le badge « Offre Miette » signale seulement que l'établissement offre une attention aux membres ; il ne change pas l'ordre d'affichage.</p>
<h2>Ni notes ni avis</h2>
<p>Miette ne publie ni notes ni avis de clients. Les informations des fiches (carte, prix, horaires, photos) sont fournies par les établissements et vérifiées à la date indiquée sur chaque fiche.</p>
<h2>Contact</h2>
<p>Pour toute question sur le classement : ${MAIL}.</p>`]
};
function pageLegal(k){
  const [t,body]=LEGAL[k];
  return `<div class="wrap page-head"><p class="crumbs"><a href="/">Accueil</a> › ${t}</p><h1>${t}</h1></div><div class="wrap"><div class="legal">${body}</div></div>`;
}

/* ---------- Routeur ---------- */
const TITLES = {accueil:"Miette - FoodClub · Restaurants de Charente-Maritime",annuaire:"Annuaire des restaurants · Miette",partenaire:"Devenir partenaire · Miette"};
const PATHKEY={"":"accueil","annuaire":"annuaire","partenaire":"partenaire","foodtrucks":"foodtrucks","compte":"compte","mentions-legales":"mentions","confidentialite":"confidentialite","cookies":"cookies","conditions-generales":"cgv","classement":"classement"};
function route(){
  const parts=location.pathname.replace(/index\.html$/,"").split("/").filter(Boolean);
  const hash=(location.hash||"").replace("#","");
  if(parts.length===0) return "accueil";
  if(parts.length===1 && PATHKEY[parts[0]]!==undefined){const k=PATHKEY[parts[0]];if(k==="partenaire"&&hash.startsWith("partenaire-"))return hash;return k;}
  if(parts.length===2 && parts[0]==="restaurants") return "r-"+parts[1];
  if(parts.length===2 && parts[0]==="foodtrucks") return "ft-"+parts[1];
  return "404";
}
function nav(url){history.pushState(null,"",url);go();}
document.addEventListener("click",e=>{
  if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  const a=e.target.closest("a[href]");if(!a||a.target||a.hasAttribute("download"))return;
  const href=a.getAttribute("href");if(!href.startsWith("/")||href.startsWith("//"))return;
  const u=new URL(href,location.origin);
  e.preventDefault();
  if(u.pathname===location.pathname&&u.hash){history.replaceState(null,"",href);const el=document.getElementById(u.hash.slice(1));if(el){el.scrollIntoView({behavior:RM?"auto":"smooth"});return;}}
  if(u.pathname===location.pathname&&!u.hash){window.scrollTo({top:0,behavior:RM?"auto":"smooth"});return;}
  history.pushState(null,"",href);go();
});
let first = true, busy = false;
const DESC={
  accueil:"Les restaurants de Charente-Maritime avec leur carte à jour, leurs horaires et ce qu'il faut savoir avant de réserver. Royan, La Palmyre, Saint-Palais, Meschers, Saujon…",
  annuaire:"L'annuaire des restaurants de Charente-Maritime : cartes à jour, horaires, équipements, filtres par commune, cuisine et budget.",
  partenaire:"Restaurateurs de Charente-Maritime : une fiche claire avec votre carte à jour, vos horaires et vos photos. 2 mois offerts pour les 15 premiers.",
  foodtrucks:"Bientôt sur Miette : les foodtrucks de Charente-Maritime, leur planning de la semaine et leur carte.",
  compte:"Votre compte Miette gratuit : favoris et Offre Miette chez les restaurants partenaires."};
function page404(){return `<div class="wrap page-head" style="text-align:center;padding-block:80px"><div class="plate solo" style="margin:0 auto 24px;width:180px" aria-hidden="true"><div class="mascot"></div></div><h1>Cette page n'est pas au menu</h1><p class="muted" style="margin-top:12px">Elle a peut-être changé d'adresse. Revenez à l'accueil ou parcourez l'annuaire.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:22px"><a class="btn btn-primary" href="/">Accueil</a><a class="btn btn-ghost" href="/annuaire/">L'annuaire</a></div></div>`;}
function setMeta(key){
  const base="https://miettefoodclub.com";
  let d=DESC[key]||"";
  if(key.startsWith("r-")&&bySlug[key.slice(2)]){const r=bySlug[key.slice(2)];d=`${r.name}, ${r.cuisine.toLowerCase()} à ${r.commune} : carte à jour, prix, horaires et infos pratiques.`;}
  if(key.startsWith("ft-")&&ftBySlug[key.slice(3)]){const f=ftBySlug[key.slice(3)];d=`${f.name}, foodtruck en Charente-Maritime : planning de la semaine et carte.`;}
  if(LEGAL[key])d=LEGAL[key][0]+" du site Miette - FoodClub.";
  const m=(sel,attr,val)=>{let el=document.head.querySelector(sel);if(!el){el=document.createElement(sel.startsWith("link")?"link":"meta");const k=sel.match(/\[(\w+)="([^"]+)"\]/);el.setAttribute(k[1],k[2]);document.head.appendChild(el);}el.setAttribute(attr,val);};
  m('meta[name="description"]',"content",d);
  m('meta[property="og:description"]',"content",d);
  m('meta[property="og:title"]',"content",document.title);
  m('link[rel="canonical"]',"href",base+location.pathname);
  m('meta[property="og:url"]',"content",base+location.pathname);
  m('meta[name="robots"]',"content",(key==="404"||key==="r-exemple"||key==="compte")?"noindex":"index, follow");
}
function render(h, scroll=true, keepScroll=false){
  const app=$("#app"); let anchor=null; let html=""; let bind=null; let key=h;
  if(h.startsWith("partenaire-")){anchor=h;key="partenaire";}
  if(key==="accueil"){html=pageHome();bind=bindHome;document.title=TITLES.accueil;}
  else if(key==="annuaire"){html=pageDir();bind=R.length?bindDir:null;document.title=TITLES.annuaire;}
  else if(key==="partenaire"){html=pagePartner();bind=bindPartner;document.title=TITLES.partenaire;}
  else if(key==="foodtrucks"){html=pageFoodtrucks();bind=bindFoodtrucks;document.title="Foodtrucks · Miette";}
  else if(key.startsWith("ft-") && ftBySlug[key.slice(3)]){const f=ftBySlug[key.slice(3)];html=pageFT(f);bind=()=>bindFT(f);document.title=`${f.name}, foodtruck · Miette`;}
  else if(key==="compte"){html=pageAccount();bind=bindAccount;document.title="Mon compte · Miette";}
  else if(LEGAL[key]){html=pageLegal(key);document.title=LEGAL[key][0]+" · Miette";}
  else if(key.startsWith("r-") && bySlug[key.slice(2)]){const r=bySlug[key.slice(2)];html=pageResto(r);bind=()=>bindResto(r);document.title=`${r.name}, ${r.cuisine.toLowerCase()} à ${r.commune} · Miette`;}
  else {html=page404();key="404";document.title="Page introuvable · Miette";}
  document.body.classList.toggle("demo-on",key==="r-exemple");
  setMeta(key);
  const y = window.scrollY;
  stopHome();
  app.innerHTML=html;
  if(!key.startsWith("r-")){const s=$("#ld");if(s)s.remove();}
  bind&&bind();
  $$("[data-nav]").forEach(a=>{if(a.dataset.nav===key)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  reveal(app);
  if(keepScroll){window.scrollTo(0,y);return;}
  if(anchor){const el=document.getElementById(anchor);if(el){setTimeout(()=>el.scrollIntoView({behavior:RM?"auto":"smooth"}),40);return;}}
  if(scroll) window.scrollTo(0,0);
}
function go(){
  const h=route();
  $("#nav").classList.remove("open");$("#menu-btn").setAttribute("aria-expanded","false");
  if(first||RM){first=false;render(h);return;}
  // ancre dans la même page partenaire : pas de rideau
  if(h.startsWith("partenaire-") && $("#partenaire-forfaits")){const el=document.getElementById(h);if(el){el.scrollIntoView({behavior:"smooth"});return;}}
  if(busy){render(h);return;}
  busy=true;
  const c=$("#curtain"); c.className=""; c.innerHTML='<div class="mascot"></div>'; void c.offsetWidth; c.className="in";
  setTimeout(()=>{render(h);c.className="out";setTimeout(()=>{c.className="";busy=false},460)},400);
}
window.addEventListener("popstate",go);

/* liens avec filtres pré-remplis */
document.addEventListener("click",e=>{
  const a=e.target.closest("a[data-q],a[data-offre],a[data-commune]");
  if(!a)return;
  F.q=a.dataset.q||"";F.commune=a.dataset.commune||"";F.offre=!!a.dataset.offre;F.cuisine="";F.budget="";F.equip.clear();
  if(route()==="annuaire"){e.preventDefault();render("annuaire");}
});

/* ---------- Accueil : animations ---------- */
let homeTimers=[], raf=null;
function stopHome(){homeTimers.forEach(clearInterval);homeTimers=[];if(raf)cancelAnimationFrame(raf);raf=null;}
function bindHome(){
  if(window.__replay){window.__replay=0;setTimeout(playIntro,80);}
  // les fiches bougent doucement avec la souris
  const st=$("#stage");
  if(st&&!RM&&matchMedia("(pointer:fine)").matches){st.addEventListener("pointermove",e=>{const b=st.getBoundingClientRect();const dx=(e.clientX-b.left)/b.width-.5,dy=(e.clientY-b.top)/b.height-.5;
    $$(".sc",st).forEach(c=>{const z=+getComputedStyle(c).getPropertyValue("--z");c.style.setProperty("--px",(-dx*40*z).toFixed(1)+"px");c.style.setProperty("--py",(-dy*30*z).toFixed(1)+"px");});});}
  // recherche
  $("#home-search").addEventListener("submit",e=>{e.preventDefault();F.q=$("#hs").value.trim();F.commune="";F.offre=false;F.cuisine="";F.budget="";F.equip.clear();if(route()==="annuaire")render("annuaire");else nav("/annuaire/");});
  $$("[data-quick]").forEach(b=>b.onclick=()=>{F.q=b.dataset.quick;F.commune="";F.offre=false;F.cuisine="";F.budget="";F.equip.clear();nav("/annuaire/");});
  // mot qui tourne
  const words=["Royan",...COMMUNES.filter(c=>c!=="Royan")];
  const rot=$("#rot"); let wi=0;
  if(!RM){homeTimers.push(setInterval(()=>{
    const s=rot.firstElementChild; s.style.transform="translateY(-100%)";s.style.opacity="0";
    setTimeout(()=>{wi=(wi+1)%words.length;s.textContent=words[wi];s.classList.toggle("long",words[wi].length>16);s.style.transition="none";s.style.transform="translateY(100%)";void s.offsetWidth;s.style.transition="";s.style.transform="none";s.style.opacity="1";},450);
  },2200));}
  // carrousel flottant
  const rail=$("#fc-rail"),track=$("#fc-track"),bar=$("#fc-bar"),cur=$("#fc-cur");
  if(!rail) return;
  const fine=matchMedia("(hover:hover) and (min-width:761px)").matches&&!RM;
  if(!fine) return;
  const cards=$$(".fc-card",track);
  let target=0,x=0,max=0,mx=0,my=0,inside=false,hov;
  const size=()=>{max=Math.max(0,track.scrollWidth-rail.clientWidth);};size();
  rail.addEventListener("mousemove",e=>{const b=rail.getBoundingClientRect();const p=Math.min(1,Math.max(0,(e.clientX-b.left-b.width*.12)/(b.width*.76)));target=p*max;mx=e.clientX;my=e.clientY;inside=true;
    cur.style.setProperty("--cx",mx+"px");cur.style.setProperty("--cy",my+"px");});
  rail.addEventListener("mouseleave",()=>{inside=false;hov=undefined;cards.forEach(k=>k.classList.remove("on"));rail.classList.remove("hovering");cur.classList.remove("on","dot");});
  const loop=()=>{size();x+=(target-x)*.045;track.style.transform=`translate3d(${-x}px,0,0)`;bar.style.left=(max?x/max*80:0)+"%";
    if(inside){const el=document.elementFromPoint(mx,my);const c=el&&el.closest(".fc-card");if(c!==hov){hov=c;cards.forEach(k=>k.classList.toggle("on",k===c));rail.classList.toggle("hovering",!!c);cur.classList.toggle("on",!!c);cur.classList.toggle("dot",!c);}}
    raf=requestAnimationFrame(loop);};
  raf=requestAnimationFrame(loop);
}

/* ---------- Révélation au défilement ---------- */
let io=null;
function reveal(root){
  if(RM||!("IntersectionObserver" in window))return;
  document.documentElement.classList.add("anim");
  if(!io)io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("on");io.unobserve(en.target)}}),{rootMargin:"0px 0px -6% 0px"});
  $$(".rv:not(.on)",root).forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top<innerHeight&&r.bottom>0){requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add("on")));}
    else io.observe(el);
  });
}

/* ---------- Divers ---------- */
let tt;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),3200);}
$("#menu-btn").onclick=e=>{const o=$("#nav").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)};

// cookies
const ck=$("#cookies");
const showCk=()=>{ck.hidden=false};
if(!store.get("miette-consent"))showCk();
$("#ck-yes").onclick=()=>{store.set("miette-consent",$("#ck-opts").hidden?"stats":($("#ck-stats").checked?"stats":"none"));ck.hidden=true;toast("Choix enregistré.")};
$("#ck-no").onclick=()=>{store.set("miette-consent","none");ck.hidden=true;toast("Aucune statistique ne sera mesurée.")};
$("#ck-more").onclick=()=>{const o=$("#ck-opts");o.hidden=!o.hidden;$("#ck-yes").textContent=o.hidden?"Accepter":"Enregistrer"};
$("#cookie-reopen").onclick=e=>{e.preventDefault();showCk()};

// écran de chargement
const ld=$("#loader");
let seen=null;try{seen=sessionStorage.getItem("miette-intro")}catch(e){}
let IT=[],ended=true,plRaf=0;
function endIntro(){if(ended)return;ended=true;IT.forEach(clearTimeout);cancelAnimationFrame(plRaf);
  const st=$("#stage");document.body.classList.remove("intro-on");
  if(!st){ld.classList.add("done");setTimeout(()=>{ld.hidden=true;ld.className="";},1050);return;}
  ld.hidden=true;
  if(st){$$(".sc",st).forEach(c=>c.classList.add("in"));const ct=$(".stage-ct",st);ct.classList.add("out");setTimeout(()=>{st.classList.remove("pre");ct.classList.remove("out");},350);}}
function playLoader(){ // chargement 0 → 100 % en plein écran (accueil classique)
  ld.className="";ld.hidden=false;void ld.offsetWidth;
  const n=$("#pl-n"),fill=$("#pl-fill"),walk=$("#pl-walk"),track=$("#pl-track");
  $$(".pl-crumb",track).forEach(c=>c.remove());
  const D=2600,t0=performance.now();let last=0;
  const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
  (function tick(now){
    const p=Math.min(1,(now-t0)/D),e=ease(p);
    n.textContent=Math.round(e*100);fill.style.width=(e*100)+"%";walk.style.left=(e*100)+"%";
    if(e-last>.045&&e<.98){last=e;const c=document.createElement("i");c.className="pl-crumb"+(Math.random()<.5?" o":"");c.style.left=`calc(${e*100}% - ${20+Math.random()*14}px)`;track.appendChild(c);}
    if(p<1)plRaf=requestAnimationFrame(tick);else IT.push(setTimeout(endIntro,250));
  })(t0);
}
function playIntro(){
  if(route()!=="accueil"){window.__replay=1;nav("/");return;}
  IT.forEach(clearTimeout);IT=[];ended=false;cancelAnimationFrame(plRaf);
  const st=$("#stage");if(!st){playLoader();return;}
  window.scrollTo(0,0);document.body.classList.add("intro-on");
  const cards=$$(".sc",st);cards.forEach(c=>c.classList.remove("in"));
  st.classList.add("pre");ld.hidden=false;ld.classList.add("skip-only");
  const n=$("#st-n");const D=2600,t0=performance.now();
  const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
  (function tick(now){
    const p=Math.min(1,(now-t0)/D),e=ease(p);n.textContent=Math.round(e*100);
    cards.forEach((c,i)=>{if(e>=(i+1)/(cards.length+1))c.classList.add("in");});
    if(p<1)plRaf=requestAnimationFrame(tick);else IT.push(setTimeout(endIntro,300));
  })(t0);
}
$(".skip",ld).onclick=endIntro;

document.addEventListener("keydown",e=>{if(e.key==="Escape")endIntro()});
$("#intro-replay").onclick=e=>{e.preventDefault();window.scrollTo(0,0);playIntro();};
const h0=route();
updFavN();
if(/[?&]desabonne=1/.test(location.search)){history.replaceState(null,"",location.pathname);setTimeout(()=>toast("C'est fait : vous ne recevrez plus d'e-mail pour les nouveaux restaurants."),700);}
const onScroll=()=>document.body.classList.toggle("scrolled",window.scrollY>30);window.addEventListener("scroll",onScroll,{passive:true});onScroll();
render(route());
if(!RM && !seen && (h0===""||h0==="accueil")){try{sessionStorage.setItem("miette-intro","1")}catch(e){} playIntro();}
})();
