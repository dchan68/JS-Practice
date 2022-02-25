let data = [
    {
        name: 'Affan',
        age: '26'
    },
    {
        name: 'Roger',
        age: '27'
    },
    {
        name: 'John',
        age: '26'
    },
    {
        name: 'Almer',
        age: '26'
    },
    {
        name: 'Ramsey',
        age: '26'
    },
    {
        name: 'Jared',
        age: '26'
    },
];

const info = document.querySelector('#info')

let details = data.map(function(item){
    return '<div>' + item.name + ' ' + 'is ' + item.age +'</div>';
    
});

info.innerHTML = details.join('\n');