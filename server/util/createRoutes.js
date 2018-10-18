module.exports = function(controller, router){

    router.param('id', controller.params);
    // router.param('name', controller.nameParams);

    router.route('/')
    .get(controller.get)
    .post(controller.post)


    router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete)

    // router.route('/findByName/:name')
    // .get(controller.getOne)
};