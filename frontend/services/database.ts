export const DB = {
  hr_core: {
    employee: {
      'EMP-7721': { id: 'EMP-7721', name: 'Sarah Jenkins', jurisdiction: 'US-WA', pay_type: 'HOURLY' }
    },
    compensation: {
      'EMP-7721': { regular_hourly_rate_cents: 3500 }
    }
  },
  hr_payroll: {
    time_entry: {
      'EMP-7721_2024-10': { approved_overtime_hours: 4.0, status: 'APPROVED', timesheet_locked: true }
    }
  },
  hr_policy: {
    handbook: [
      {
        source_id: 'SRC-WA-HB-2024',
        jurisdiction: 'US-WA',
        section_id: 'SECTION 3: YOUR PAY AND PROGRESS',
        topic: 'overtime',
        exact_quote: 'Washington: Non-exempt employees will be paid at a rate of 1.5x their regular hourly rate for hours worked in excess of 40 in a workweek.'
      },
      {
        source_id: 'SRC-CA-HB-2024',
        jurisdiction: 'US-CA',
        section_id: 'SECTION 3: YOUR PAY AND PROGRESS',
        topic: 'overtime',
        exact_quote: 'California: Non-exempt employees receive 1.5x their regular rate for hours worked over 8 up to 12 in a workday, or over 40 in a workweek.'
      }
    ]
  }
};
