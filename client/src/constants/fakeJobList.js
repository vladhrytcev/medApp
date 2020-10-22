export const allJobsList = [
  {
    _id: 1,
    title: 'Pflegekraft',
    dates: [
      {
        type: "Neue_Dienstanfrage",
        date: {
          _id: 21,
          startDate: new Date(2020, 10, 22, 8),
          endDate: new Date(2020, 10, 23, 19),
          activity: 'times'
        },
      },
      {
        type: "Neue_Dienstanfrage",
        date: {
          _id: 22,
          startDate: new Date(2020, 10, 23, 7),
          endDate: new Date(2020, 10, 23, 19),
          activity: 'times'
        },
      },
    ],
    applicants: [
      {
        _id: 91,
        state: 'selected',
        user: {
          _id: 191,
          firstName: 'Angelina', 
          lastName: 'Musterfrau',
          user_info: {qualification: {level: 'Intern'}}
        }  
      },
      {
        _id: 92,
        state: "applied",
        user: {
          _id: 192,
          firstName: 'Maria',
          lastName: 'Hoffental',
          user_info: {qualification: {level: 'Doctor'}}
        }  
      },
    ],
    salary: [
      {
        _id: 40,
        activity: 'Bereitschaftsdienst',
        cost: '120'
      },
      {
        _id: 41,
        activity: 'Tagdienst',
        cost: '130'
      },
    ],
    organisation: {
      name: 'UKB Chirurgie',
    },
    state: 'External_...'
  },
  {
    _id: 2,
    title: 'Assistenzarzt Innere Medizin',
    dates: [
      {
        type: "vertretungsarzt",
        date: {
          _id: 23,
          startDate: new Date(2020, 10, 23, 7),
          endDate: new Date(2020, 10, 30, 19),
          activity: 'Bereitschaftsdienst'
        },
      },
      {
        type: "vertretungsarzt",
        date: {
          _id: 24,
          startDate: new Date(2020, 10, 23, 7),
          endDate: new Date(2020, 10, 23, 19),
          activity: 'Tagdienst'
        },
      },
    ],
    applicants: [
      {
        _id: 1,
        state: "applied",
        user: {
          _id: 1,
          firstName: 'Angelina',
          lastName: 'Musterfrau',
          user_info: {qualification: {level: 'Intern'}} 
        }  
      },
      {
        _id: 2,
        state: "selected",
        user: {
          _id: 2,
          firstName: 'Maria',
          lastName: 'Hoffental',
          user_info: {qualification: {level: 'Doctor'}}
        }  
      },
    ],
    salary: [
      {
        _id: 40,
        activity: 'Bereitschaftsdienst',
        cost: '120'
      },
      {
        _id: 41,
        activity: 'Tagdienst',
        cost: '130'
      },
    ],
    organisation: {
      name: "UKB Chirurgie",
    },
    state: 'External_...'
  },
  //--------For "Bestaetigung" table
  {
    _id: 3,
    title: 'Pflegekraft', //FILLED
    dates: [
      {
        type: "vertretungsarzt",
        date: {
          _id: 24,
          startDate: new Date(2020, 10, 23, 9),
          endDate: new Date(2020, 10, 30, 15),
          activity: 'Bereitschaftsdienst'
        },
      },
      {
        type: "vertretungsarzt",
        date: {
          _id: 25,
          startDate: new Date(2020, 10, 23, 7),
          endDate: new Date(2020, 10, 23, 19),
          activity: 'Tagdienst'
        },
      },
    ],
    applicants: [
      {
        _id: 73,
        state: "applied",
        user: {
          _id: 1,
          firstName: 'Angelina',
          lastName: 'Musterfrau',
          user_info: {qualification: {level: 'Doctorai'}} 
        }  
      },
      {
        _id: 72,
        state: "applied",
        user: {
          _id: 2,
          firstName: 'Maria',
          lastName: 'Hoffental',
          user_info: {qualification: {level: 'NurseToRent'}}
        }  
      },
    ],
    salary: [
      {
        _id: 40,
        activity: 'Bereitschaftsdienst',
        cost: '120'
      },
      {
        _id: 41,
        activity: 'Tagdienst',
        cost: '130'
      },
    ],
    organisation: {
      name: "UKB Chirurgie",
    },
    state: 'External_...'
  },
  {
    _id: 4,
    title: 'Medizin', //FILLED
    dates: [
      {
        type: "vertretungsarzt",
        date: {
          _id: 203,
          startDate: new Date(2020, 10, 24, 7),
          endDate: new Date(2020, 10, 30, 19),
          activity: 'Bereitschaftsdienst'
        },
      },
      {
        type: "vertretungsarzt",
        date: {
          _id: 204,
          startDate: new Date(2020, 10, 23, 7),
          endDate: new Date(2020, 10, 23, 19),
          activity: 'Tagdienst'
        },
      },
    ],
    applicants: [
      {
        _id: 41,
        state: "applied",
        user: {
          _id: 1,
          firstName: 'Angelina',
          lastName: 'Musterfrau',
          user_info: {qualification: {level: 'Doctorai'}} 
        }  
      },
      {
        _id: 82,
        state: "applied",
        user: {
          _id: 2,
          firstName: 'Maria',
          lastName: 'Hoffental',
          user_info: {qualification: {level: 'NurseToRent'}}
        }  
      },
    ],
    salary: [
      {
        _id: 40,
        activity: 'Bereitschaftsdienst',
        cost: '120'
      },
      {
        _id: 41,
        activity: 'Tagdienst',
        cost: '130'
      },
    ],
    organisation: {
      name: "UKB Chirurgie",
    },
    state: 'External_...'
  },
  //--------For "Offene shifts" table
  {
    _id: 5,
    title: 'Pflegekraft', //FILLED
    dates: [
      {
        type: "vertretungsarzt",
        date: {
          _id: 24,
          startDate: new Date(2020, 10, 23, 9),
          endDate: new Date(2020, 10, 30, 15),
          activity: 'Bereitschaftsdienst'
        },
      },
      {
        type: "vertretungsarzt",
        date: {
          _id: 25,
          startDate: new Date(2020, 10, 23, 7),
          endDate: new Date(2020, 10, 23, 19),
          activity: 'Tagdienst'
        },
      },
    ],
    applicants: [],
    salary: [],
    organisation: {
      name: "UKB Chirurgie",
    },
    state: 'Internal'
  },
  {
    _id: 6,
    title: 'Medizin', //FILLED
    dates: [
      {
        type: "vertretungsarzt",
        date: {
          _id: 24,
          startDate: new Date(2020, 10, 28, 9),
          endDate: new Date(2020, 10, 30, 15),
          activity: 'Bereitschaftsdienst'
        },
      },
      {
        type: "vertretungsarzt",
        date: {
          _id: 25,
          startDate: new Date(2020, 10, 23, 7),
          endDate: new Date(2020, 10, 23, 19),
          activity: 'Tagdienst'
        },
      },
    ],
    applicants: [],
    salary: [
      {
        _id: 40,
        activity: 'Bereitschaftsdienst',
        cost: '120'
      },
      {
        _id: 41,
        activity: 'Tagdienst',
        cost: '130'
      },
    ],
    organisation: {
      name: "UKB Chirurgie",
    },
    state: 'External'
  },
]