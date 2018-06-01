class Animal {
    constructor(data){
        this.id = data.id;
        this.gov_id = data.gov_id ? data.gov_id : null;
        this.iron_num = data.iron_num ? data.iron_num : null;
        this.herd_num = data.herd_num;
        this.gender = data.gender;
        this.pregnant = data.pregnant;
        this.birth_date = data.birth_date;
        this.gen_1 = data.gen_1 ? data.gen_1 : null;
        this.animal_type = {_type:data._type, id:data.animal_type};
        this.calvings = data.calving_times && data.calving_times.length ? 
            data.calving_times.map((time, index) => {return {time:time, size:data.calving_sizes[index]}}) :
            [];
        this.udder = data.udder ? data.udder : null;
    }
}

module.exports = Animal;