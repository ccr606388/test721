/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (key, arr) => {
    let temp = arr.map(item => {
        let { [key[0]]: key1, [key[1]]: key2, ...a } = item;
        return a;
    })

    return temp;
};
exports.excludeByProperty = (key, arr) => {
    let temp = arr.filter(item => {
        return item[key] !== true;
    })

    return temp;
};
exports.sumDeep = (arr) => {
    let temp = arr.map(item => {
        return {
            objects: item.objects.reduce((sum, i) => {
                return sum += i.val;
            }, 0)
        }
    })

    return temp;
};
exports.applyStatusColor = (key, arr) => {
    let keyMap = {}
    let temp = []
    Object.keys(key).forEach(i => {
        key[i].forEach(val => keyMap[val] = i)
    })

    arr.forEach(k => {
        if (typeof (keyMap[k.status]) !== "undefined") {
            temp.push({
                status: k.status,
                color: keyMap[k.status]
            })
        }
    })

    return temp;
};
exports.createGreeting = (fGreet, str) => {
    return name => {
        return fGreet(str, name);
    }
};
exports.setDefaults = (key) => {
    let ks = Object.keys(key);
    function fApply(obj) {
        ks.forEach(val => {
            if (typeof (obj[val]) === "undefined") { 
                obj[val] = key[val];
            }
        })
        return obj;
    }
    return fApply;
};

exports.fetchUserByNameAndUsersCompany = (name, services) => {
    console.log(new Date())

    let { fetchStatus, fetchUsers, fetchCompanyById } = services;

    return fetchUsers().then(val => {
        return val;
    }).then(val => {
        let user = val.find(i => { return i.name === name })
        return Promise.all([fetchStatus(), fetchCompanyById(user.companyId)]).then(v => {
            var temp = {
                user: user,
                company: v[1],
                status: v[0]
            }
            console.log(temp);
            return temp
        })
    })
}