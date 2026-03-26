export const SYMPTOMS = [
  "fever", "cough", "fatigue", "headache", "sore_throat", "runny_nose",
  "body_aches", "chills", "nausea", "vomiting", "diarrhea", "abdominal_pain",
  "chest_pain", "shortness_of_breath", "loss_of_smell", "loss_of_taste",
  "sneezing", "congestion", "dizziness", "rash", "joint_pain", "swelling",
  "itching", "blurred_vision", "frequent_urination", "excessive_thirst",
  "weight_loss", "night_sweats", "muscle_weakness", "back_pain",
  // New symptoms
  "wheezing", "palpitations", "anxiety", "depression", "insomnia",
  "dry_mouth", "excessive_sweating", "hair_loss", "pale_skin", "bruising",
  "blood_in_urine", "blood_in_stool", "difficulty_swallowing", "hoarseness",
  "ear_pain", "hearing_loss", "eye_redness", "sensitivity_to_light",
  "numbness", "tingling", "memory_loss", "confusion", "seizures",
  "tremors", "stiff_neck", "swollen_lymph_nodes", "cold_hands",
  "leg_cramps", "yellow_skin", "dark_urine",
] as const;

export type Symptom = typeof SYMPTOMS[number];

export function formatSymptom(s: string): string {
  return s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

export interface DiseaseEntry {
  disease: string;
  symptoms: Symptom[];
  medicines: { name: string; dosage: string }[];
  precautions: string[];
  advice: string[];
  severity: "low" | "medium" | "high";
}

export const DISEASE_DATABASE: DiseaseEntry[] = [
  {
    disease: "Common Flu (Influenza)",
    symptoms: ["fever", "cough", "fatigue", "body_aches", "chills", "sore_throat", "headache", "congestion"],
    medicines: [
      { name: "Paracetamol (500mg)", dosage: "1 tablet every 6 hours" },
      { name: "Ibuprofen (200mg)", dosage: "1 tablet every 8 hours after food" },
      { name: "Cetirizine (10mg)", dosage: "1 tablet at bedtime" },
    ],
    precautions: ["Rest adequately", "Stay hydrated", "Avoid contact with others", "Wash hands frequently"],
    advice: ["Drink warm fluids like soup or herbal tea", "Monitor temperature regularly", "Consult doctor if fever exceeds 103°F or lasts more than 3 days"],
    severity: "medium",
  },
  {
    disease: "COVID-19",
    symptoms: ["fever", "cough", "fatigue", "loss_of_smell", "loss_of_taste", "shortness_of_breath", "body_aches", "sore_throat", "headache"],
    medicines: [
      { name: "Paracetamol (650mg)", dosage: "1 tablet every 6 hours" },
      { name: "Vitamin C (1000mg)", dosage: "1 tablet daily" },
      { name: "Zinc (50mg)", dosage: "1 tablet daily" },
    ],
    precautions: ["Self-isolate for 5-7 days", "Wear a mask", "Monitor oxygen levels", "Ventilate rooms"],
    advice: ["Seek emergency care if oxygen drops below 94%", "Prone positioning helps breathing", "Stay in touch with healthcare provider"],
    severity: "high",
  },
  {
    disease: "Food Poisoning",
    symptoms: ["vomiting", "nausea", "diarrhea", "abdominal_pain", "fever", "fatigue", "chills"],
    medicines: [
      { name: "ORS (Oral Rehydration Salts)", dosage: "After each loose stool" },
      { name: "Ondansetron (4mg)", dosage: "1 tablet every 8 hours for nausea" },
      { name: "Loperamide (2mg)", dosage: "2 tablets initially, then 1 after each loose stool (max 8/day)" },
    ],
    precautions: ["Avoid solid food initially", "Sip fluids slowly", "Avoid dairy products", "Rest your stomach"],
    advice: ["Start with bland foods (BRAT diet)", "Seek help if symptoms last more than 48 hours", "Watch for signs of dehydration"],
    severity: "medium",
  },
  {
    disease: "Migraine",
    symptoms: ["headache", "nausea", "blurred_vision", "dizziness", "fatigue", "sensitivity_to_light"],
    medicines: [
      { name: "Sumatriptan (50mg)", dosage: "1 tablet at onset of migraine" },
      { name: "Ibuprofen (400mg)", dosage: "1 tablet with food" },
      { name: "Metoclopramide (10mg)", dosage: "1 tablet for nausea" },
    ],
    precautions: ["Avoid bright lights and loud sounds", "Rest in a dark room", "Stay hydrated", "Identify and avoid triggers"],
    advice: ["Keep a headache diary to track triggers", "Regular sleep schedule helps prevent episodes", "Consider preventive medication if frequent"],
    severity: "medium",
  },
  {
    disease: "Common Cold",
    symptoms: ["runny_nose", "sneezing", "congestion", "sore_throat", "cough", "fatigue", "headache"],
    medicines: [
      { name: "Pseudoephedrine (60mg)", dosage: "1 tablet every 6 hours" },
      { name: "Chlorpheniramine (4mg)", dosage: "1 tablet every 6 hours" },
      { name: "Throat Lozenges", dosage: "As needed for sore throat" },
    ],
    precautions: ["Wash hands frequently", "Cover mouth when sneezing", "Stay home if possible", "Use tissues and dispose properly"],
    advice: ["Symptoms usually resolve in 7-10 days", "Steam inhalation may help congestion", "Honey in warm water soothes throat"],
    severity: "low",
  },
  {
    disease: "Gastritis",
    symptoms: ["abdominal_pain", "nausea", "vomiting", "dizziness", "fatigue", "back_pain"],
    medicines: [
      { name: "Pantoprazole (40mg)", dosage: "1 tablet before breakfast" },
      { name: "Antacid Gel", dosage: "2 tsp after meals" },
      { name: "Domperidone (10mg)", dosage: "1 tablet before meals" },
    ],
    precautions: ["Avoid spicy and acidic food", "Eat smaller frequent meals", "Don't skip meals", "Avoid alcohol and NSAIDs"],
    advice: ["Eating on time is crucial", "Stress management helps", "Consult gastroenterologist if persistent"],
    severity: "medium",
  },
  {
    disease: "Allergic Rhinitis",
    symptoms: ["sneezing", "runny_nose", "congestion", "itching", "headache", "fatigue"],
    medicines: [
      { name: "Cetirizine (10mg)", dosage: "1 tablet daily" },
      { name: "Fluticasone Nasal Spray", dosage: "2 sprays each nostril daily" },
      { name: "Montelukast (10mg)", dosage: "1 tablet at bedtime" },
    ],
    precautions: ["Avoid known allergens", "Keep windows closed during pollen season", "Use air purifiers", "Shower after being outdoors"],
    advice: ["Identify specific allergens with allergy testing", "Saline nasal irrigation may help", "Consider immunotherapy for long-term relief"],
    severity: "low",
  },
  {
    disease: "Urinary Tract Infection",
    symptoms: ["frequent_urination", "abdominal_pain", "fever", "back_pain", "nausea", "fatigue"],
    medicines: [
      { name: "Nitrofurantoin (100mg)", dosage: "1 capsule twice daily for 5 days" },
      { name: "Paracetamol (500mg)", dosage: "1 tablet every 6 hours for pain" },
      { name: "Phenazopyridine (200mg)", dosage: "1 tablet 3 times daily after meals" },
    ],
    precautions: ["Drink plenty of water", "Urinate frequently", "Maintain hygiene", "Avoid holding urine"],
    advice: ["Cranberry juice may help prevention", "Complete the full course of antibiotics", "Consult doctor — antibiotics require prescription"],
    severity: "medium",
  },
  {
    disease: "Diabetes (Type 2) Symptoms",
    symptoms: ["frequent_urination", "excessive_thirst", "fatigue", "blurred_vision", "weight_loss", "dizziness"],
    medicines: [
      { name: "Metformin (500mg)", dosage: "Consult doctor for proper dosage" },
      { name: "Blood Glucose Monitor", dosage: "Check fasting and post-meal levels" },
    ],
    precautions: ["Monitor blood sugar regularly", "Follow a balanced diet", "Exercise regularly", "Limit sugar and refined carbs"],
    advice: ["This requires professional diagnosis", "Lifestyle changes are crucial", "Regular HbA1c testing recommended", "See an endocrinologist"],
    severity: "high",
  },
  {
    disease: "Dengue Fever",
    symptoms: ["fever", "headache", "body_aches", "joint_pain", "rash", "fatigue", "nausea", "vomiting"],
    medicines: [
      { name: "Paracetamol (500mg)", dosage: "1 tablet every 6 hours (avoid aspirin/ibuprofen)" },
      { name: "ORS", dosage: "Frequent sips throughout the day" },
    ],
    precautions: ["Avoid NSAIDs (aspirin, ibuprofen)", "Monitor platelet count", "Rest completely", "Use mosquito nets"],
    advice: ["Seek immediate care if bleeding occurs", "Hydration is critical", "Platelet monitoring every 24-48 hours", "Papaya leaf extract may help (consult doctor)"],
    severity: "high",
  },
  {
    disease: "Arthritis (Joint Inflammation)",
    symptoms: ["joint_pain", "swelling", "fatigue", "muscle_weakness", "back_pain", "body_aches"],
    medicines: [
      { name: "Diclofenac (50mg)", dosage: "1 tablet twice daily after food" },
      { name: "Glucosamine (1500mg)", dosage: "1 tablet daily" },
      { name: "Topical Analgesic", dosage: "Apply to affected joints 2-3 times daily" },
    ],
    precautions: ["Maintain healthy weight", "Low-impact exercise", "Apply hot/cold packs", "Avoid joint overuse"],
    advice: ["Physical therapy is highly beneficial", "Swimming is excellent exercise for joints", "Consult rheumatologist for proper diagnosis"],
    severity: "medium",
  },
  // New diseases
  {
    disease: "Asthma",
    symptoms: ["wheezing", "shortness_of_breath", "chest_pain", "cough", "fatigue"],
    medicines: [
      { name: "Salbutamol Inhaler", dosage: "2 puffs as needed for acute symptoms" },
      { name: "Budesonide Inhaler", dosage: "2 puffs twice daily (preventive)" },
      { name: "Montelukast (10mg)", dosage: "1 tablet at bedtime" },
    ],
    precautions: ["Avoid triggers (dust, smoke, allergens)", "Always carry rescue inhaler", "Monitor peak flow regularly", "Keep environment clean"],
    advice: ["Create an asthma action plan with your doctor", "Regular check-ups are important", "Flu vaccination recommended annually"],
    severity: "high",
  },
  {
    disease: "Anemia",
    symptoms: ["fatigue", "pale_skin", "dizziness", "shortness_of_breath", "cold_hands", "headache", "hair_loss"],
    medicines: [
      { name: "Ferrous Sulfate (325mg)", dosage: "1 tablet daily with vitamin C" },
      { name: "Folic Acid (5mg)", dosage: "1 tablet daily" },
      { name: "Vitamin B12 (1000mcg)", dosage: "1 tablet daily" },
    ],
    precautions: ["Eat iron-rich foods (spinach, red meat, lentils)", "Avoid tea/coffee with meals", "Take iron on empty stomach if tolerable", "Regular blood tests"],
    advice: ["Identify the cause of anemia", "Iron supplements may cause dark stools (normal)", "Consult hematologist if persistent"],
    severity: "medium",
  },
  {
    disease: "Anxiety Disorder",
    symptoms: ["anxiety", "palpitations", "insomnia", "excessive_sweating", "tremors", "dizziness", "shortness_of_breath"],
    medicines: [
      { name: "Consult psychiatrist", dosage: "Professional evaluation needed" },
      { name: "Relaxation techniques", dosage: "Daily practice recommended" },
    ],
    precautions: ["Practice deep breathing", "Regular exercise", "Limit caffeine and alcohol", "Maintain sleep hygiene"],
    advice: ["Cognitive behavioral therapy (CBT) is effective", "Medication may be needed — consult professional", "Support groups can help", "Mindfulness meditation reduces symptoms"],
    severity: "medium",
  },
  {
    disease: "Pneumonia",
    symptoms: ["fever", "cough", "shortness_of_breath", "chest_pain", "chills", "fatigue", "nausea", "confusion"],
    medicines: [
      { name: "Amoxicillin (500mg)", dosage: "1 capsule 3 times daily (prescription needed)" },
      { name: "Paracetamol (500mg)", dosage: "1 tablet every 6 hours for fever" },
      { name: "Cough Suppressant", dosage: "As directed" },
    ],
    precautions: ["Complete the full antibiotic course", "Rest and avoid strenuous activity", "Stay hydrated", "Monitor breathing closely"],
    advice: ["Chest X-ray needed for diagnosis", "Seek emergency care if breathing worsens", "Vaccination can prevent some types", "Follow up with doctor after treatment"],
    severity: "high",
  },
  {
    disease: "Hepatitis",
    symptoms: ["yellow_skin", "dark_urine", "fatigue", "nausea", "abdominal_pain", "fever", "joint_pain", "loss_of_taste"],
    medicines: [
      { name: "Consult hepatologist", dosage: "Professional evaluation and blood tests needed" },
      { name: "Paracetamol (AVOID)", dosage: "Do NOT take — liver damage risk" },
    ],
    precautions: ["Avoid alcohol completely", "Avoid hepatotoxic drugs", "Practice good hygiene", "Get vaccinated (Hep A & B)"],
    advice: ["Blood tests (liver function) are essential", "Hepatitis B/C require specific antiviral treatment", "Rest is important for recovery", "Notify close contacts"],
    severity: "high",
  },
  {
    disease: "Meningitis",
    symptoms: ["fever", "headache", "stiff_neck", "nausea", "vomiting", "sensitivity_to_light", "confusion", "rash"],
    medicines: [
      { name: "EMERGENCY — Go to ER immediately", dosage: "This is a medical emergency" },
    ],
    precautions: ["Seek immediate medical attention", "Do not delay treatment", "Inform healthcare providers of symptoms", "Vaccination available"],
    advice: ["This is a life-threatening condition", "Early antibiotic treatment is critical", "Close contacts may need prophylaxis", "Recovery may take weeks"],
    severity: "high",
  },
  {
    disease: "Thyroid Disorder (Hypothyroidism)",
    symptoms: ["fatigue", "weight_loss", "hair_loss", "cold_hands", "depression", "muscle_weakness", "dry_mouth", "constipation" as any],
    medicines: [
      { name: "Levothyroxine", dosage: "Consult endocrinologist for dosage" },
    ],
    precautions: ["Take medication on empty stomach", "Regular thyroid function tests", "Consistent medication timing", "Avoid soy products near medication time"],
    advice: ["TSH blood test needed for diagnosis", "Medication is usually lifelong", "Regular monitoring every 6-12 months", "Symptoms improve in 2-4 weeks of treatment"],
    severity: "medium",
  },
  {
    disease: "Conjunctivitis (Pink Eye)",
    symptoms: ["eye_redness", "itching", "swelling", "sensitivity_to_light"],
    medicines: [
      { name: "Antibiotic Eye Drops", dosage: "1-2 drops every 4-6 hours" },
      { name: "Artificial Tears", dosage: "As needed for comfort" },
    ],
    precautions: ["Don't touch or rub eyes", "Wash hands frequently", "Don't share towels or pillows", "Replace eye makeup"],
    advice: ["Usually resolves in 1-2 weeks", "Viral conjunctivitis is highly contagious", "Cold compress can relieve symptoms", "See ophthalmologist if no improvement"],
    severity: "low",
  },
  {
    disease: "Ear Infection (Otitis Media)",
    symptoms: ["ear_pain", "fever", "hearing_loss", "headache", "dizziness", "nausea"],
    medicines: [
      { name: "Amoxicillin (500mg)", dosage: "1 capsule 3 times daily (prescription)" },
      { name: "Ibuprofen (200mg)", dosage: "1 tablet every 8 hours for pain" },
      { name: "Ear Drops", dosage: "As prescribed" },
    ],
    precautions: ["Keep ear dry", "Don't insert objects in ear", "Complete antibiotic course", "Follow up if symptoms persist"],
    advice: ["Common in children but adults can get them too", "Usually resolves with antibiotics", "Recurrent infections may need ENT referral", "Hearing usually returns to normal"],
    severity: "medium",
  },
  {
    disease: "Peripheral Neuropathy",
    symptoms: ["numbness", "tingling", "muscle_weakness", "leg_cramps", "dizziness", "back_pain"],
    medicines: [
      { name: "Gabapentin (300mg)", dosage: "Consult neurologist for dosage" },
      { name: "Vitamin B Complex", dosage: "1 tablet daily" },
    ],
    precautions: ["Manage underlying conditions (diabetes)", "Protect numb areas from injury", "Regular foot care", "Avoid alcohol"],
    advice: ["Nerve conduction studies may be needed", "Controlling blood sugar helps if diabetic", "Physical therapy can improve function", "See a neurologist for proper evaluation"],
    severity: "medium",
  },
];

export interface PredictionResult {
  disease: string;
  probability: number;
  matchedSymptoms: string[];
  totalSymptoms: number;
  entry: DiseaseEntry;
}

export function predictDisease(userSymptoms: Symptom[]): PredictionResult[] {
  if (userSymptoms.length === 0) return [];

  const results: PredictionResult[] = DISEASE_DATABASE.map(entry => {
    const matched = entry.symptoms.filter(s => userSymptoms.includes(s));
    const matchRatio = matched.length / entry.symptoms.length;
    const coverageRatio = matched.length / userSymptoms.length;
    const probability = Math.round((matchRatio * 0.6 + coverageRatio * 0.4) * 100);

    return {
      disease: entry.disease,
      probability,
      matchedSymptoms: matched,
      totalSymptoms: entry.symptoms.length,
      entry,
    };
  });

  return results
    .filter(r => r.matchedSymptoms.length >= 2 || (userSymptoms.length === 1 && r.matchedSymptoms.length >= 1))
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 5);
}

// Symptom categories for better organization
export const SYMPTOM_CATEGORIES: Record<string, Symptom[]> = {
  "General": ["fever", "fatigue", "chills", "weight_loss", "night_sweats", "excessive_sweating"],
  "Head & Neurological": ["headache", "dizziness", "blurred_vision", "sensitivity_to_light", "memory_loss", "confusion", "seizures", "tremors", "numbness", "tingling"],
  "Respiratory": ["cough", "shortness_of_breath", "wheezing", "congestion", "sneezing", "runny_nose", "sore_throat", "hoarseness"],
  "Digestive": ["nausea", "vomiting", "diarrhea", "abdominal_pain", "difficulty_swallowing", "loss_of_taste", "loss_of_smell"],
  "Musculoskeletal": ["body_aches", "joint_pain", "back_pain", "muscle_weakness", "swelling", "stiff_neck", "leg_cramps"],
  "Skin & Appearance": ["rash", "itching", "pale_skin", "yellow_skin", "bruising", "hair_loss"],
  "Cardiovascular": ["chest_pain", "palpitations", "cold_hands"],
  "Urinary": ["frequent_urination", "excessive_thirst", "blood_in_urine", "dark_urine"],
  "Mental Health": ["anxiety", "depression", "insomnia"],
  "Eyes & Ears": ["eye_redness", "ear_pain", "hearing_loss"],
  "Other": ["swollen_lymph_nodes", "dry_mouth", "blood_in_stool"],
};
