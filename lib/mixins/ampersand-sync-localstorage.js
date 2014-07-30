function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

module.exports = function (name) {
    var store = localStorage.getItem(name),
        records = (store && store.split(',')) || [];

    return function (method, model, options) {
        var result;

        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
            model = options.attrs || model.toJSON(options);
        }

        try {
            switch(method) {
                case 'create':
                    if (!model.id) model.id = guid();
                    records.push(model.id);
                case 'update':
                    if(records.indexOf(model.id) === -1) records.push(model.id);
                    localStorage.setItem(name + '-' + model.id, JSON.stringify(model));
                    break;
                case 'patch':
                    // TODO
                    throw new Error('not implemented');
                    break;
                case 'delete':
                    records.splice(records.indexOf(model.id), 1);
                    localStorage.removeItem(name + '-' + model.id);
                    break;
                case 'read':
                    if(!model.id) {
                        result = records
                            .map(function (id) { return JSON.parse(localStorage.getItem(name + '-' + id)); })
                            .filter(function (r) { return r !== null });
                    } else {
                        result = JSON.parse(localStorage.getItem(name + '-' + model.id));
                    }
                    break;
            }

            localStorage.setItem(name, records.join(','));

        } catch (ex) {
            if (options && options.error) options.error(result, 'error', ex.message)
            else throw ex;
        }

        if (options && options.success) options.success(result, 'success');
    };

};
