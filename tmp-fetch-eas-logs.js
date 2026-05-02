const https = require('https');
const {URL} = require('url');
const urls = [
  'https://job-logs.eascdn.net/production/89a97cd9-6816-47f9-b7e3-3a792a7ab16d/1777707571307-b25ac41f-45bf-4774-a8f9-584dd5db62a6.txt?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=www-production%40exponentjs.iam.gserviceaccount.com%2F20260502%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260502T074628Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=bb1989b82f6db58ff344d34c4112c457c56ab8b9a2cdb8d43eace3a10955d51c568b1dbbb9a105126e411ff839f2e5487aeed9137f540a9c84097baaa18099d71b6eb9635edd096924c412bc02f082c779650c250fa7626133720ecb74af85fd09d6c86bef21fc4f9dd7832788d1006077d59b6242df5155478e5a267e10bff63971660cd7f2f0113a52e850fe0db5aa59ef649549c5bff7c5427f79c77c661c05d0688591fc42631be0433892d1808b94be24ae750749dbe7c219d48336013bb27ec9702e200c0f55a4dbeaaa235eefef33eef146bd7d126fffa8f4295b4e717a92b973c4399a30d5a58cabb48a2cfa5af941cf3965e1a729bc3232df6887d3',
  'https://job-logs.eascdn.net/production/89a97cd9-6816-47f9-b7e3-3a792a7ab16d/1777707578784-573a8461-011b-47e7-8cf5-7d102c807178.txt?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=www-production%40exponentjs.iam.gserviceaccount.com%2F20260502%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260502T074628Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=663767938a1b73ec147de81ee75c1b3aa6d84ce8feda039f15c65a6ff108c08a194e446d9ac061c9c93badbeab2461993d62b1688f2af17fae487aef9f6c65697574c32013f4daf7a041b932db8f4703aeb8b8accaba91b3f69cc700515996dba5499f98f4afbe0f991f974a75aac46af9042e0fb79653bc456f94a3cadc0373c03640e3061c6fb918c992800ca6dc415b8d25122590d255e0b648b9c05541679d6871421de6e160020e93945f28f92dc789b1418ea654d91f5ed285bbacef975902f3889ed8a02424fb1f9d2bd85da44a776551af8393e4aa8040143d72ef8d3d0cb9133fa36d9818784817998f4c4b68d001945c28fd300a56a7487132f2f9',
  'https://job-logs.eascdn.net/production/89a97cd9-6816-47f9-b7e3-3a792a7ab16d/1777707579032-62857957-1b00-4bba-aa71-1c591c49648e.txt?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=www-production%40exponentjs.iam.gserviceaccount.com%2F20260502%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260502T074628Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=5e6f7853d528e1be9c53f78786b8a6c4e4deb62b3f3243107b81ec15f04066abd668ba874687383ca0fbfd79358aa4c19f939fe8d349e8d4e38cae93856addea70a8716c8e9890fef21168d57abecdba7126f1ebc8ebb2d7223c7007013b4c930d6be08e5c34de0a9d73cc01bad4e52c5b5983b5e14f1a5c988eff2d331fbd5f71e8ac4df61ba01295156ca39411da35ff099ac576603a5c13a1b9cd77d26a1d32d0b19ed56e47ebd6053e7dec5535356d08b8c796e88750e8283546a4c45e6658cdb2406f850d4a76d3045f236db1505acacb54fb07b884e8a0b76f4f919aa17c30d91e1a9d99b233f61f3683ce4bd307ade4f9f898d13bd12c1cea7436137b',
  'https://job-logs.eascdn.net/production/89a97cd9-6816-47f9-b7e3-3a792a7ab16d/1777707579221-a77cec4a-a254-4fa1-a1fc-385a9b5523b6.txt?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=www-production%40exponentjs.iam.gserviceaccount.com%2F20260502%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20260502T074628Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=98b9b166d76d271ba1459673f472ca95b80b482493e467e86104b3157daa000cd10da4f986ff8c634f991ac5d2002ebfdfd3a13c9448b0b8a4c7e9c6d2c9e0e4be4241bc3c6445bb15d34d7d4adca37eab572dabf4d0c888562b5dd153e285cb17401c38eb2b60266655fa46e4cf9ebaa6496003231d92c92b4f6a21d98abd646440659f9cea89081f7f329da4a32a39aceef73662533e5fc8092a145a06190e3005e44e821e22e8b19972cab8a625b499525443664ad1457a1c250713d07d83f3bd624685478acd2d66a86e8bb4361fb4f5eb6d46afd1f1e943071fa89985c7058d13fc768a3890f4c9e1286fce95d34736c594b8be51b71a6cb17622b9d951'
];
const terms = ['FAILURE', 'ERROR', 'Exception', 'gradlew', 'BUILD FAILED', 'Task', 'Caused by', 'Java heap space'];
function fetchText(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options = { hostname: u.hostname, path: u.pathname + u.search, headers: { Host: u.hostname } };
    https.get(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}
(async () => {
  for (let i = 0; i < urls.length; i++) {
    const text = await fetchText(urls[i]);
    console.log('=== LOG', i, 'length=', text.length, '===');
    for (const term of terms) {
      let idx = 0;
      while ((idx = text.indexOf(term, idx + 1)) !== -1) {
        const snippet = text.slice(Math.max(0, idx - 120), Math.min(text.length, idx + term.length + 220));
        const clean = snippet.replace(/\n/g, ' ').replace(/\s+/g, ' ');
        console.log(term, '=>', clean);
        if (idx > 200000) break;
      }
    }
  }
})();
