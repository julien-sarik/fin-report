
import { parse } from 'csv-parse/sync';

export default function Report({csv}: {csv: string | undefined}) {
    if (csv === undefined) {
        return <div/>
    }
    const report = generateReport(csv);
    const listItems = Object.entries(report).map(([k, value]) =>
        <li key={k}>
          {k}: {value}
        </li>
      );
  return ( 
    <div>
      <ul>{listItems}</ul>
    </div>
  );
}

function generateReport(csvContent: string) {
    console.log('parsing csv')
    const records = parseCSV(csvContent);
    const interestRegexp = /.*dont capital.\s*(\d+).*/
    var investment = 0, repaid = 0, capital = 0, interest = 0;
    for (const index in records){
        const record = records[index]
        const tag = record['Intitulé (2)']
        const amount = parseInt(record['Montant'])
        if (tag.startsWith('Debtor')){
            investment += amount
        } else if (tag.startsWith('Versement')) {
            repaid += amount
        }
        if (tag.includes('dont capital')) {
            const res = tag.match(interestRegexp)
            if (res && res.length >= 2) {
              const recordCapital = parseInt(res[1])
              capital += recordCapital
              interest += amount - recordCapital
            }
        }
    }
    return {
        'investment': investment,
        'repaid': repaid,
        'repaid capital': capital,
        'interest': interest
    }
}

function parseCSV(content: string) {
    return parse(content, {
        columns: true,
        skip_empty_lines: true
      });
}