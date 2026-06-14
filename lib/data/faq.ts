export const FAQ_GENERAL = [
  {
    question: "Quels sont vos délais d'intervention ?",
    answer: "Pour les urgences (panne électrique, fuite d'eau, panne de chauffage), nous intervenons en moins d'une heure, 24h/24 et 7j/7. Pour les travaux planifiés, nous proposons des rendez-vous sous 48h à 72h selon la période.",
  },
  {
    question: "Proposez-vous des devis gratuits ?",
    answer: "Oui, tous nos devis sont entièrement gratuits et sans engagement. Vous pouvez en faire la demande via notre formulaire en ligne ou par téléphone. Nous répondons sous 24h ouvrées.",
  },
  {
    question: "Êtes-vous certifiés et assurés ?",
    answer: "Oui, Therklima détient les certifications Qualifelec (électricité), RGE QualiPac (pompes à chaleur), et dispose d'une garantie décennale et d'une assurance responsabilité civile professionnelle couvrant tous nos métiers.",
  },
  {
    question: "Intervenez-vous pour les professionnels ?",
    answer: "Absolument. Nous travaillons aussi bien pour les particuliers que les professionnels (bureaux, commerces, restaurants, copropriétés). Nous proposons des contrats de maintenance annuels adaptés.",
  },
  {
    question: "Peut-on bénéficier d'aides financières ?",
    answer: "Oui ! Pour les travaux de rénovation énergétique (PAC, VMC, isolation), vous pouvez bénéficier de MaPrimeRénov', des Certificats d'Économies d'Énergie (CEE) et de l'Éco-PTZ. Nos experts vous guident dans vos demandes.",
  },
  {
    question: "Quelle est votre zone d'intervention ?",
    answer: "Therklima intervient principalement sur Paris et toute l'Île-de-France : Hauts-de-Seine, Val-de-Marne, Seine-Saint-Denis, Yvelines, Essonne et Val-d'Oise. Contactez-nous pour vérifier votre secteur.",
  },
];

export const FAQ_BY_METIER: Record<string, Array<{ question: string; answer: string }>> = {
  electricite: [
    {
      question: "Qu'est-ce que la norme NF C 15-100 ?",
      answer: "C'est la norme française qui régit les installations électriques dans les logements. Elle impose des règles précises sur le nombre de prises, les protections différentielles et la mise à la terre. Toutes nos installations sont conformes à cette norme.",
    },
    {
      question: "Quand faut-il refaire son installation électrique ?",
      answer: "Si votre installation a plus de 15 ans, si les disjoncteurs sautent fréquemment, si vous n'avez pas de prise de terre ou de différentiel 30mA, il est recommandé de faire un diagnostic. Nous proposons un bilan électrique gratuit.",
    },
    {
      question: "Combien coûte la mise en conformité électrique ?",
      answer: "Le coût dépend de l'état de l'installation existante et de la surface. Comptez entre 1 500€ et 5 000€ pour un appartement standard. Un devis précis est établi après visite.",
    },
  ],
  plomberie: [
    {
      question: "Comment détecter une fuite d'eau cachée ?",
      answer: "Signes : compteur d'eau qui tourne sans utilisation, taches d'humidité, odeur de moisissure, facture d'eau anormalement élevée. Nous utilisons des détecteurs de fuites électroniques pour localiser les fuites sans démolition.",
    },
    {
      question: "Quel chauffe-eau choisir ?",
      answer: "Le choix dépend de votre configuration (électrique, gaz, solaire ou thermodynamique), de la surface du logement et du nombre d'occupants. Un chauffe-eau thermodynamique consomme 3x moins qu'un électrique classique.",
    },
    {
      question: "Peut-on déboucher soi-même une canalisation ?",
      answer: "Pour les bouchons légers (évier, lavabo), oui. Mais pour les canalisations principales ou les WC, il vaut mieux faire appel à un professionnel pour éviter d'aggraver les dégâts. Nous intervenons 24h/24.",
    },
  ],
  chauffage: [
    {
      question: "Quelle est la différence entre chaudière fioul et gaz ?",
      answer: "La chaudière gaz est plus propre, moins chère à l'usage et plus facile à entretenir. Le fioul reste plus cher à l'achat mais peut être stocké. Cependant, en 2026, il est recommandé de migrer vers des solutions plus écologiques (PAC, gaz condensation).",
    },
    {
      question: "À quelle fréquence faire entretenir sa chaudière ?",
      answer: "L'entretien annuel est obligatoire pour les chaudières gaz et fioul de plus de 4 kW. Il est recommandé en automne avant la saison de chauffe. Nous proposons des contrats d'entretien annuels.",
    },
  ],
  climatisation: [
    {
      question: "Quelle puissance de climatiseur pour mon salon ?",
      answer: "En règle générale : 1 kW de puissance pour 10m² bien isolés. Un salon de 25m² nécessite donc 2,5 à 3 kW. Nous dimensionnons précisément selon l'exposition, l'isolation et la hauteur sous plafond.",
    },
    {
      question: "Faut-il un entretien annuel pour la climatisation ?",
      answer: "Oui, un entretien annuel est recommandé et obligatoire pour les systèmes au-dessus d'un certain seuil. Il inclut le nettoyage des filtres, la vérification du circuit frigorifique et le contrôle des pressions.",
    },
  ],
  pac: [
    {
      question: "Quelle aide pour une pompe à chaleur en 2026 ?",
      answer: "MaPrimeRénov' peut couvrir de 30% à 65% du coût selon vos revenus. Les CEE (Certificats d'Économies d'Énergie) apportent un bonus supplémentaire. L'Éco-PTZ à taux zéro finance le reste. Nos experts vous accompagnent dans toutes les démarches.",
    },
    {
      question: "PAC air-air ou air-eau, quelle différence ?",
      answer: "La PAC air-air produit uniquement du chaud/froid via des splits. La PAC air-eau produit de l'eau chaude pour les radiateurs ET l'eau chaude sanitaire. Elle est plus adaptée au remplacement d'une chaudière.",
    },
  ],
  ventilation: [
    {
      question: "VMC simple flux ou double flux, que choisir ?",
      answer: "La VMC simple flux extrait l'air vicié et laisse entrer l'air frais naturellement — moins chère mais moins efficace. La VMC double flux récupère la chaleur de l'air extrait pour chauffer l'air neuf — idéale pour les maisons bien isolées.",
    },
    {
      question: "Quand remplacer sa VMC ?",
      answer: "Si votre VMC a plus de 10 ans, fait du bruit, se condense ou ne ventile plus correctement, il est temps de la changer. Une VMC défectueuse favorise l'humidité et les moisissures dans le logement.",
    },
  ],
};
