const gt = require('google-trends-api');
const fs = require('fs')
let data = [];

const getTrend = async (query) => {
    return gt.interestOverTime({
        keyword: query,
        startTime: new Date(2015,0,1)
    })
    .then(results => results)
}

const getData = async () => {
    for (let q of queries) {
		const trend = await getTrend(q);
        const json = JSON.parse(trend)
        data.push({query: q, value: json.default.timelineData.map(d => d.value[0])})
	}
    console.log(data)
    fs.writeFileSync('needhelp.json', JSON.stringify(data))
};

const queries = ["I'm an addict","I have ADHD","I'm an alcoholic","I have anger issues","I have anorexia","I have anxiety","I'm bipolar","I have BPD","I broke up with someone","I have bulimia","I have cancer","I have covid","I'm depressed","I have an eating disorder","I'm grieving","I'm a hoarder","I'm homeless","I have a mental illness","I'm a migrant","I have OCD","I had a panic attack","I'm poor","I have PTSD","I want to quit smoking","I was raped","I'm a refugee","I have schizophrenia","I had a seizure","I want to hurt myself","I have low self-esteem","I have shortness of breath","I want to kill myself"];

getData();