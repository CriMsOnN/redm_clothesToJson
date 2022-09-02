const axios = require('axios');
const fs = require('fs');

const url = "https://raw.githubusercontent.com/femga/rdr3_discoveries/master/clothes/cloth_hash_names.lua";
const regex = /{hashname="(.+?)",category_hashname="(.+?)",ped_type="(.+?)",is_multiplayer=(.+?),category_hash=(.+?),hash=(.+?),hash_dec_signed=(.+?),category_hash_dec_signed=(.+?)},/g;
let m;
let clothes = [];
; (async () => {
    const { data } = await axios.get(url);
    while ((m = regex.exec(data)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        if (clothes[m[2].toLocaleLowerCase()]) {
            clothes[m[2].toLocaleLowerCase()].push({
                hashname: m[1],
                category_hashname: m[2],
                ped_type: m[3],
                is_multiplayer: Boolean(m[4]),
                category_hash: +m[5],
                hash: +m[6],
                hash_dec_signed: +m[7],
                category_hash_dec_signed: +m[8]
            });
        } else {
            clothes[m[2].toLocaleLowerCase()] = [
                {
                    hashname: m[1],
                    category_hashname: m[2],
                    ped_type: m[3],
                    is_multiplayer: Boolean(m[4]),
                    category_hash: +m[5],
                    hash: +m[6],
                    hash_dec_signed: +m[7],
                    category_hash_dec_signed: +m[8]
                }
            ];
        }
    }
    const jsonClothes = Object.assign({}, clothes);
    fs.writeFileSync('./clothes.json', JSON.stringify(jsonClothes, null, 2));
})()

