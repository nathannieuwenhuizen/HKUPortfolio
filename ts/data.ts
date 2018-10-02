export interface Iproject {
    title: string;
    team: string;
    duration: string;
    date: string;
    summary: string;
    description: string;
    images: string[];
    buttons: string[];
}
export enum subjects {
    ToolsForThinking = 'Tools for Thinking',
    ECTTP = 'Empowering Creative Thinking through Programming',
    Tekenen = 'Tekenen',
    Anim = 'Animatie',
    PersoonlijkeEffectiviteit = 'Persoonlijke Effectiviteit',
    ArtMediaMe = 'Art, Media & Me',
    LookandInpsire = 'Look & Inspire',
    GravischeVormgeving = 'Grafische Vormgeving',
    Usability = 'Usability',
    PrinciplesofInteractionDesign = 'Principles of Interaction Design'
}
export interface Ihomework {
    subject: string; //vak = subjects.____
    year: number; //leerjaar
    link: string; //href link
    link_name: string; //link string
    description: string; // small description
    image_link: string; // image url for preview
}
