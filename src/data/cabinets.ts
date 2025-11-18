export interface Cabinet {
  establishment: string;
  identification: string;
  room: string;
  reference: string;
  type: string;
  airVelocityThresholds?: {
    min: number;
    max: number;
    warning?: number;
  };
}

export const cabinets: Cabinet[] = [
  {
    establishment: "ESIROI",
    identification: "A",
    room: "A120",
    reference: "MAPS 8545 07",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "B",
    room: "A120",
    reference: "MAPS 11576 08",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "C",
    room: "A120",
    reference: "MAPS 8544 07",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "D",
    room: "A120",
    reference: "MAPS 11577 08",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "E",
    room: "A120",
    reference: "17094-11",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "F",
    room: "A120",
    reference: "143 2004",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "G",
    room: "A120",
    reference: "27395-1701",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "H",
    room: "A120",
    reference: "A0109-283954-0320-8",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "I",
    room: "A120",
    reference: "A0109-283950-0320-4",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "J",
    room: "A120",
    reference: "A0109-283951-0320-5",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "K",
    room: "A123",
    reference: "A0304-284239-0320-1",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "L",
    room: "A123",
    reference: "A0304-284240-0320-4",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "M",
    room: "A123",
    reference: "A0304-284241-0320-5",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "N",
    room: "A123",
    reference: "A0109-283952-0320-6",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "O",
    room: "A123",
    reference: "A0109-283953-0320-7",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "P",
    room: "A123",
    reference: "65689/2007",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "Q",
    room: "A118 _ A119",
    reference: "32166-2001",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "R",
    room: "A118 _ A119",
    reference: "19719-12",
    type: "Armoire Chimique"
  },
  {
    establishment: "ESIROI",
    identification: "H01",
    room: "A118 / A119",
    reference: "32165-2001",
    type: "Hotte"
  },
  {
    establishment: "ESIROI",
    identification: "-",
    room: "A118 / A119",
    reference: "32165-2001 |Captair smart 391",
    type: "Hotte / PSM"
  },
  {
    establishment: "ESIROI",
    identification: "H02",
    room: "A118 / A119",
    reference: "70130 | BIGNEAT",
    type: "Hotte"
  },
  {
    establishment: "ESIROI",
    identification: "PSM07",
    room: "A118 / A119",
    reference: "1395",
    type: "Hotte / PSM"
  },
  {
    establishment: "ESIROI",
    identification: "S01",
    room: "A118 / A119",
    reference: "06607",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S02",
    room: "A117",
    reference: "06603",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S03",
    room: "A114",
    reference: "06606",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S04",
    room: "A114",
    reference: "06604",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S05",
    room: "A114",
    reference: "06612",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S06",
    room: "A114",
    reference: "06608",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S07",
    room: "A114",
    reference: "06609",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S08",
    room: "A114",
    reference: "06605",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S09",
    room: "A114",
    reference: "06610",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S10",
    room: "A114",
    reference: "06611",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S11",
    room: "A114",
    reference: "NC [SIMOUN]",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S12",
    room: "A114",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "S",
    room: "A117",
    reference: "",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "ESIROI",
    identification: "PSM01",
    room: "A117",
    reference: "1394",
    type: "Hotte / PSM"
  },
  {
    establishment: "ESIROI",
    identification: "PSM02",
    room: "A117",
    reference: "1391",
    type: "Hotte / PSM"
  },
  {
    establishment: "ESIROI",
    identification: "PSM03",
    room: "A117",
    reference: "1390",
    type: "Hotte / PSM"
  },
  {
    establishment: "ESIROI",
    identification: "PSM04",
    room: "A117",
    reference: "1389",
    type: "Hotte / PSM"
  },
  {
    establishment: "ESIROI",
    identification: "PSM05",
    room: "A117",
    reference: "1393",
    type: "Hotte / PSM"
  },
  {
    establishment: "ESIROI",
    identification: "PSM06",
    room: "A117",
    reference: "1396",
    type: "Hotte / PSM"
  },
  {
    establishment: "Campus du Tampon",
    identification: "AC1",
    room: "M2-14",
    reference: "21325-13",
    type: "Armoire Chimique"
  },
  {
    establishment: "Campus du Tampon",
    identification: "AC2",
    room: "M2-15",
    reference: "18958-12",
    type: "Armoire Chimique"
  },
  {
    establishment: "Campus du Tampon",
    identification: "Univ22712",
    room: "M2-13",
    reference: "19570-12",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Campus du Tampon",
    identification: "AC3",
    room: "P26-Stokage 2",
    reference: "32108-2001",
    type: "Armoire Chimique"
  },
  {
    establishment: "Campus du Tampon",
    identification: "Sorbonne 1",
    room: "P26-Prépa TP",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Campus du Tampon",
    identification: "AC4",
    room: "P26-Prépa TP",
    reference: "14 02 14 29",
    type: "Armoire Chimique"
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.001",
    room: "TP Biotechnologie [SPi.D34D.NO.16]",
    reference: "univ-05920",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "IUT",
    identification: "PSM RED-01",
    room: "TP Biotechnologie [SPi.D34D.NO.16]",
    reference: "univ-041416 - Cytair",
    type: "PSM"
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.002",
    room: "TP Physique industriel [SPi.D34D.NO.18]",
    reference: "univ-05934",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.003",
    room: "Salle de préparation TP [SPi.D34D.NO.21]",
    reference: "univ-05947",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "IUT",
    identification: "Hot.a.flux.lam...001  [Hygitek 04]",
    room: "Préparation TP [SPi.D34D.NO.21]",
    reference: "univ-05963 |Optimum121|S/N :14159",
    type: "Hotte"
  },
  {
    establishment: "IUT",
    identification: "PSM 01",
    room: "Salle de culture [SPi.D34D.NO.20]",
    reference: "univ-05963|ESCO",
    type: "PSM"
  },
  {
    establishment: "IUT",
    identification: "PSM -- HS",
    room: "Salle de culture [SPi.D34D.NO.20]",
    reference: "FASTER|BIO-48-M 1285",
    type: "PSM"
  },
  {
    establishment: "IUT",
    identification: "PSM -- HS",
    room: "Salle de culture [SPi.D34D.NO.20]",
    reference: "FASTER|BH-EN- 2004-S 900",
    type: "PSM"
  },
  {
    establishment: "IUT",
    identification: "PSM -- HS",
    room: "Salle de culture [SPi.D34D.NO.20]",
    reference: "THERMO|306050248",
    type: "PSM"
  },
  {
    establishment: "IUT",
    identification: "PSM.002",
    room: "Centrifugeuse [SPi.D34D.NO.32]",
    reference: "univ-05980|ADS",
    type: "PSM"
  },
  {
    establishment: "IUT",
    identification: "PSM.003",
    room: "Centrifugeuse [SPi.D34D.NO.32]",
    reference: "BIOCYT|39805279",
    type: "PSM"
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.011",
    room: "TP Biologie [SPi.D34D.NO.30]",
    reference: "--",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "IUT",
    identification: "Hott.lam.001",
    room: "TP Biologie [SPi.D34D.NO.30]",
    reference: "Optimum121|14527|univ-05994",
    type: "Hotte"
  },
  {
    establishment: "IUT",
    identification: "Hott.lam.002",
    room: "TP Biologie [SPi.D34D.NO.30]",
    reference: "Optimum121|14526|univ-05995",
    type: "Hotte"
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.012",
    room: "TP Biologie [SPi.D34D.NO.30]",
    reference: "univ-05997",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.008",
    room: "TP Biochimie [SPi.D34D.NO.27]",
    reference: "univ-06034",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.009",
    room: "TP Biochimie [SPi.D34D.NO.27]",
    reference: "univ-06033",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.04",
    room: "LCSNSA [SPi.D34D.NO.17]",
    reference: "univ-05916",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.005",
    room: "TP Chimie [SPi.D34D.NO.25]",
    reference: "univ-06051",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "IUT",
    identification: "Hott.PCR.001",
    room: "TP Chimie [SPi.D34D.NO.25]",
    reference: "RNA-9513-07|univ-06054|CAPTAIR",
    type: "Hotte"
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.006",
    room: "TP Chimie [SPi.D34D.NO.25]",
    reference: "univ-06052",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.007",
    room: "TP Chimie [SPi.D34D.NO.25]",
    reference: "univ-06053",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "IUT",
    identification: "Sorbonne.010",
    room: "[SPi.D34D.NO.24]",
    reference: "univ-6005",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },



  
  {
    establishment: "Fac Moufia",
    identification: "APS 6376 06 ",
    room: "S0-13",
    reference: "APS 6376 06 | CAPTAIR",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "04",
    room: "S0-13",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "03",
    room: "S0-09 à 012",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "01",
    room: "S1-0",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "SN 1994-05",
    room: "S1-0",
    reference: "MAPD 1994 05 | CAPTAIR",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "03",
    room: "S1-0",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "10|S1-2|33",
    room: "S1-2 - Salle 33",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "11|S1-2|33",
    room: "S1-2 - Salle 33",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "12|S1-2|33",
    room: "S1-2- Salle 33",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "13|S1-2|33",
    room: "S1-13 - Salle 33",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "SN 149 1999",
    room: "S1-2 - Salle 33",
    reference: "149-1999 | CAPTAIR by Erlab",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "08|S1-2|42 - [Hotte 1]",
    room: "S2-42 - Laboratoire 6",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "09|S1-2|42 - [Hotte 2]",
    room: "S2-42 - Laboratoire 6",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "14|S1-2|36",
    room: "S2-36 - Laboratoire 5",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "15|S1-2|36",
    room: "S2-36 - Laboratoire 5",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "Armoire 04",
    room: "S2-34 - Stock produits chimique",
    reference: "151 2002",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "Armoire 05",
    room: "S2-34 - Stock produits chimique",
    reference: "Univ29478",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "Armoire 06",
    room: "S2-34 - Stock produits chimique",
    reference: "24253-1501",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "Armoire 01 | Armoire 02",
    room: "S2-35 - Stock produits chimique",
    reference: "108-1998",
    type: "Armoire Chimique"
  },
   {
    establishment: "Fac Moufia",
    identification: "Armoire 03",
    room: "S2-35 - Stock produits chimique",
    reference: "104-1999",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "16|S1-2|19",
    room: "S2-19 - Laboratoire 3",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "17|S1-2|19",
    room: "S2-19 - Laboratoire 3",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "18|S1-2|19",
    room: "S2-19 - Laboratoire 3",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "04|S1-2|10",
    room: "S2-10 - Laboratoire 2",
    reference: "-",
    type: "Hotte / PSM"
  },
  {
    establishment: "Fac Moufia",
    identification: "19|S1-2|10",
    room: "S2-10 - Laboratoire 2",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "25|S1-2|13",
    room: "S1-2 - Salle 13",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "24|S1-2|13",
    room: "S1-2 - Salle 13",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "Univ24793",
    room: "S2-03 a - Stockage 1",
    reference: "Univ24793",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "02|S1-2|02",
    room: "S2-02 Laboratoire 1",
    reference: "-",
    type: "Hotte / PSM"
  },
  {
    establishment: "Fac Moufia",
    identification: "26|S1-2| 05-06",
    room: "S2- 05 à 06",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "19|S1-2|15",
    room: "S1-2 - Salle 15",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "20|S1-2|15",
    room: "S1-2 - Salle 15",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "21|S1-2|15",
    room: "S1-2 - Salle 15",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "22|S1-2|15",
    room: "S1-2 - Salle 15",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "SMART 7634 1P1C - 34708-2101",
    room: "S2-16 Préparation Stockage",
    reference: "34708-2101",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "(3)  AVP 804 CAPTAIR by ERLAB",
    room: "S2-16 Préparation Stockage",
    reference: "AP 1920 05",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "AVPD 804 CAPTAIR by ERLAB",
    room: "S2-16 Préparation Stockage",
    reference: "APD 1926 05",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "SN :  AP 3575 06  | (4) (5)",
    room: "S2-16 Préparation Stockage",
    reference: "AP 3575 06",
    type: "Armoire Chimique"
  },
   {
    establishment: "Fac Moufia",
    identification: "26|S1-2|18",
    room: "S2-16 Préparation Stockage",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  
  {
    establishment: "Fac Moufia",
    identification: "01|S1-1|8",
    room: "S1-1 - Salle 8",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "33",
    room: "S1-1 - Salle 8 -Arrière salle",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "02|S1-2|43",
    room: "S1-2 - Salle 43 ",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "03|S1-2|43",
    room: "S1-2 - Salle 43 ",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "04|S1-2|43",
    room: "S1-2 - Salle 43 ",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "05|S1-2|43",
    room: "S1-2 - Salle 43 ",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "06|S1-2|43",
    room: "S1-2 - Salle 43",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "07|S1-2|43",
    room: "S1-2 - Salle 43 ",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "01|S1-2|44",
    room: "S1-2 - Salle 44",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "SN:15723-10 Midcap AVPDS 804 CAPTAIR",
    room: "S1-2 - Salle 44",
    reference: "MAPDS 15723 10",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "A3 DC 2-49",
    room: "S1-2 - Salle 44",
    reference: "0475 04",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "SN:103 2004 - AVPD 804 ",
    room: "S2-0 - Salle 1 - TP CHIMIE",
    reference: "103 2004",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "24",
    room: "S2-0 - Salle 1 - TP CHIMIE",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "25",
    room: "S2-0 - Salle 1 - TP CHIMIE",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "26",
    room: "S2-0 - Salle 1 - TP CHIMIE",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "27",
    room: "S2-0 - Salle 1 - TP CHIMIE",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "28",
    room: "S2-0 - Salle 1 - TP CHIMIE",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "29",
    room: "S2-0 - Salle 1 - TP CHIMIE",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "AVPD 804 102-2004",
    room: "S5-0 Salle 4 - Préparation2",
    reference: "102-2004",
    type: "Armoire Chimique"
  },
  {
    establishment: "Fac Moufia",
    identification: "30",
    room: "S5-0 Salle 4 - Préparation2",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "PSM-1 | Thermo Scientific",
    room: "S5-0 Salle 4 - Préparation 2",
    reference: "42152815",
    type: "PSM"
  },
  {
    establishment: "Fac Moufia",
    identification: "Univ25599 | TELSTAR AeolusV4",
    room: "S6b1 - S6b2 - S6b3",
    reference: "522641",
    type: "PSM"
  },
  {
    establishment: "Fac Moufia",
    identification: "S06",
    room: "S6b1 - S6b2 - S6b3",
    reference: "-",
    type: "Sorbonne",
    airVelocityThresholds: {
      min: 0.40,
      max: 0.60,
      warning: 0.4
    }
  },
  {
    establishment: "Fac Moufia",
    identification: "02 - CYTAIR",
    room: "S6b1 - S6b2 - S6b3",
    reference: "---",
    type: "PSM"
  },
  {
    establishment: "Fac Moufia",
    identification: "CaptairFlow 391",
    room: "S6b1 - S6b2 - S6b3",
    reference: "22897-14",
   type: "Hotte"
  }
];