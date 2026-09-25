import { WordCard } from "@/types";

// Seed data. This is intentionally small — extend each array with more
// cards, or later replace this whole file with a fetch from a real API,
// since every consumer only calls getWordsFor(topicId).

let uid = 0;
const id = () => `w${++uid}`;

function card(topicId: string, prompt: string, acceptedAnswers: string[], displayAnswer?: string, hint?: string): WordCard {
  return {
    id: id(),
    topicId,
    prompt,
    acceptedAnswers: acceptedAnswers.map((a) => a.toLowerCase()),
    displayAnswer: displayAnswer ?? acceptedAnswers[0],
    hint,
  };
}

// ---------- English > Synonym --------------------------------------------------
const enSynEnvironment = [
  card("en-synonym-environment", "pollution", ["contamination"], "contamination"),
  card("en-synonym-environment", "sustainable", ["renewable", "eco-friendly"], "renewable / eco-friendly"),
  card("en-synonym-environment", "deforestation", ["logging"], "logging"),
  card("en-synonym-environment", "drought", ["dry spell"], "dry spell"),
  card("en-synonym-environment", "conserve", ["preserve", "protect"], "preserve / protect"),
  card("en-synonym-environment", "emissions", ["discharge"], "discharge"),
];
const enSynTechnology = [
  card("en-synonym-technology", "innovative", ["inventive", "groundbreaking"], "inventive / groundbreaking"),
  card("en-synonym-technology", "automate", ["mechanize"], "mechanize"),
  card("en-synonym-technology", "device", ["gadget"], "gadget"),
  card("en-synonym-technology", "obsolete", ["outdated"], "outdated"),
  card("en-synonym-technology", "efficient", ["effective"], "effective"),
  card("en-synonym-technology", "upgrade", ["improve", "enhance"], "improve / enhance"),
];
const enSynEducation = [
  card("en-synonym-education", "curriculum", ["syllabus"], "syllabus"),
  card("en-synonym-education", "diligent", ["hardworking", "studious"], "hardworking / studious"),
  card("en-synonym-education", "comprehend", ["understand"], "understand"),
  card("en-synonym-education", "scholarship", ["grant"], "grant"),
  card("en-synonym-education", "literate", ["educated"], "educated"),
  card("en-synonym-education", "assessment", ["evaluation"], "evaluation"),
];
const enSynHealth = [
  card("en-synonym-health", "chronic", ["persistent", "long-lasting"], "persistent / long-lasting"),
  card("en-synonym-health", "remedy", ["cure", "treatment"], "cure / treatment"),
  card("en-synonym-health", "fatigue", ["exhaustion", "tiredness"], "exhaustion / tiredness"),
  card("en-synonym-health", "nutritious", ["healthy", "wholesome"], "healthy / wholesome"),
  card("en-synonym-health", "recover", ["heal", "recuperate"], "heal / recuperate"),
  card("en-synonym-health", "epidemic", ["outbreak"], "outbreak"),
];

// ---------- English > Bangla meaning --------------------------------------------
const enMeanEnvironment = [
  card("en-meaning-environment", "pollution", ["দূষণ", "dushon"], "দূষণ (dushon)"),
  card("en-meaning-environment", "drought", ["খরা", "khora"], "খরা (khora)"),
  card("en-meaning-environment", "flood", ["বন্যা", "bonna"], "বন্যা (bonna)"),
  card("en-meaning-environment", "forest", ["বন", "bon"], "বন (bon)"),
  card("en-meaning-environment", "climate", ["জলবায়ু", "jolobayu"], "জলবায়ু (jolobayu)"),
  card("en-meaning-environment", "recycle", ["পুনর্ব্যবহার", "punorbebohar"], "পুনর্ব্যবহার"),
];
const enMeanTechnology = [
  card("en-meaning-technology", "computer", ["কম্পিউটার", "computer"], "কম্পিউটার"),
  card("en-meaning-technology", "internet", ["ইন্টারনেট", "internet"], "ইন্টারনেট"),
  card("en-meaning-technology", "software", ["সফটওয়্যার", "software"], "সফটওয়্যার"),
  card("en-meaning-technology", "device", ["যন্ত্র", "jontro"], "যন্ত্র (jontro)"),
  card("en-meaning-technology", "network", ["নেটওয়ার্ক", "network"], "নেটওয়ার্ক"),
  card("en-meaning-technology", "upgrade", ["উন্নতি", "unnoti"], "উন্নতি (unnoti)"),
];
const enMeanEducation = [
  card("en-meaning-education", "school", ["বিদ্যালয়", "biddaloy"], "বিদ্যালয় (biddaloy)"),
  card("en-meaning-education", "teacher", ["শিক্ষক", "shikkhok"], "শিক্ষক (shikkhok)"),
  card("en-meaning-education", "student", ["ছাত্র", "chattro"], "ছাত্র (chattro)"),
  card("en-meaning-education", "exam", ["পরীক্ষা", "porikkha"], "পরীক্ষা (porikkha)"),
  card("en-meaning-education", "knowledge", ["জ্ঞান", "gyan"], "জ্ঞান (gyan)"),
  card("en-meaning-education", "scholarship", ["বৃত্তি", "britti"], "বৃত্তি (britti)"),
];
const enMeanHealth = [
  card("en-meaning-health", "medicine", ["ওষুধ", "oshudh"], "ওষুধ (oshudh)"),
  card("en-meaning-health", "doctor", ["ডাক্তার", "daktar"], "ডাক্তার (daktar)"),
  card("en-meaning-health", "fever", ["জ্বর", "jor"], "জ্বর (jor)"),
  card("en-meaning-health", "exercise", ["ব্যায়াম", "bayam"], "ব্যায়াম (bayam)"),
  card("en-meaning-health", "hospital", ["হাসপাতাল", "hasপাতাল"], "হাসপাতাল (hospital)"),
  card("en-meaning-health", "nutrition", ["পুষ্টি", "pushti"], "পুষ্টি (pushti)"),
];

// ---------- German > Synonym -----------------------------------------------------
const deSynEnvironment = [
  card("de-synonym-environment", "Umweltverschmutzung", ["Verunreinigung"], "Verunreinigung"),
  card("de-synonym-environment", "nachhaltig", ["umweltfreundlich"], "umweltfreundlich"),
  card("de-synonym-environment", "Abholzung", ["Rodung"], "Rodung"),
  card("de-synonym-environment", "Dürre", ["Trockenheit"], "Trockenheit"),
  card("de-synonym-environment", "schützen", ["bewahren", "erhalten"], "bewahren / erhalten"),
  card("de-synonym-environment", "Emissionen", ["Ausstoß"], "Ausstoß"),
];
const deSynTechnology = [
  card("de-synonym-technology", "innovativ", ["neuartig"], "neuartig"),
  card("de-synonym-technology", "Gerät", ["Apparat"], "Apparat"),
  card("de-synonym-technology", "veraltet", ["überholt"], "überholt"),
  card("de-synonym-technology", "effizient", ["wirksam"], "wirksam"),
  card("de-synonym-technology", "verbessern", ["optimieren"], "optimieren"),
  card("de-synonym-technology", "automatisieren", ["mechanisieren"], "mechanisieren"),
];
const deSynEducation = [
  card("de-synonym-education", "Lehrplan", ["Curriculum"], "Curriculum"),
  card("de-synonym-education", "fleißig", ["strebsam"], "strebsam"),
  card("de-synonym-education", "verstehen", ["begreifen"], "begreifen"),
  card("de-synonym-education", "Stipendium", ["Förderung"], "Förderung"),
  card("de-synonym-education", "gebildet", ["belesen"], "belesen"),
  card("de-synonym-education", "Bewertung", ["Beurteilung"], "Beurteilung"),
];
const deSynHealth = [
  card("de-synonym-health", "chronisch", ["andauernd"], "andauernd"),
  card("de-synonym-health", "Heilmittel", ["Medikament"], "Medikament"),
  card("de-synonym-health", "Erschöpfung", ["Müdigkeit"], "Müdigkeit"),
  card("de-synonym-health", "gesund", ["nahrhaft"], "nahrhaft"),
  card("de-synonym-health", "genesen", ["heilen"], "heilen"),
  card("de-synonym-health", "Epidemie", ["Ausbruch"], "Ausbruch"),
];

// ---------- German > Bangla meaning ------------------------------------------------
const deMeanEnvironment = [
  card("de-meaning-environment", "Umwelt", ["পরিবেশ", "poribesh"], "পরিবেশ (poribesh)"),
  card("de-meaning-environment", "Dürre", ["খরা", "khora"], "খরা (khora)"),
  card("de-meaning-environment", "Überschwemmung", ["বন্যা", "bonna"], "বন্যা (bonna)"),
  card("de-meaning-environment", "Wald", ["বন", "bon"], "বন (bon)"),
  card("de-meaning-environment", "Klima", ["জলবায়ু", "jolobayu"], "জলবায়ু (jolobayu)"),
  card("de-meaning-environment", "recyceln", ["পুনর্ব্যবহার", "punorbebohar"], "পুনর্ব্যবহার"),
];
const deMeanTechnology = [
  card("de-meaning-technology", "Computer", ["কম্পিউটার", "computer"], "কম্পিউটার"),
  card("de-meaning-technology", "Internet", ["ইন্টারনেট", "internet"], "ইন্টারনেট"),
  card("de-meaning-technology", "Software", ["সফটওয়্যার", "software"], "সফটওয়্যার"),
  card("de-meaning-technology", "Gerät", ["যন্ত্র", "jontro"], "যন্ত্র (jontro)"),
  card("de-meaning-technology", "Netzwerk", ["নেটওয়ার্ক", "network"], "নেটওয়ার্ক"),
  card("de-meaning-technology", "Verbesserung", ["উন্নতি", "unnoti"], "উন্নতি (unnoti)"),
];
const deMeanEducation = [
  card("de-meaning-education", "Schule", ["বিদ্যালয়", "biddaloy"], "বিদ্যালয় (biddaloy)"),
  card("de-meaning-education", "Lehrer", ["শিক্ষক", "shikkhok"], "শিক্ষক (shikkhok)"),
  card("de-meaning-education", "Schüler", ["ছাত্র", "chattro"], "ছাত্র (chattro)"),
  card("de-meaning-education", "Prüfung", ["পরীক্ষা", "porikkha"], "পরীক্ষা (porikkha)"),
  card("de-meaning-education", "Wissen", ["জ্ঞান", "gyan"], "জ্ঞান (gyan)"),
  card("de-meaning-education", "Stipendium", ["বৃত্তি", "britti"], "বৃত্তি (britti)"),
];
const deMeanHealth = [
  card("de-meaning-health", "Medizin", ["ওষুধ", "oshudh"], "ওষুধ (oshudh)"),
  card("de-meaning-health", "Arzt", ["ডাক্তার", "daktar"], "ডাক্তার (daktar)"),
  card("de-meaning-health", "Fieber", ["জ্বর", "jor"], "জ্বর (jor)"),
  card("de-meaning-health", "Übung", ["ব্যায়াম", "bayam"], "ব্যায়াম (bayam)"),
  card("de-meaning-health", "Krankenhaus", ["হাসপাতাল", "hospital"], "হাসপাতাল"),
  card("de-meaning-health", "Ernährung", ["পুষ্টি", "pushti"], "পুষ্টি (pushti)"),
];

export const WORDS: WordCard[] = [
  ...enSynEnvironment, ...enSynTechnology, ...enSynEducation, ...enSynHealth,
  ...enMeanEnvironment, ...enMeanTechnology, ...enMeanEducation, ...enMeanHealth,
  ...deSynEnvironment, ...deSynTechnology, ...deSynEducation, ...deSynHealth,
  ...deMeanEnvironment, ...deMeanTechnology, ...deMeanEducation, ...deMeanHealth,
];

export function getWordsFor(topicId: string): WordCard[] {
  return WORDS.filter((w) => w.topicId === topicId);
}
