const { assert } = require('chai');
const Question = require('../../lib/models/Question');
const User = require('../../lib/models/User');
const { getErrors } = require('./helpers');

describe('Question model', () => {

    const joe = {
        username: 'Joe'
    };

    const data = {
        prompt: 'Why did the coffee file a police report',
        status: 'submit'
    };

    const user = new User(joe);

    it('is a valid model', () => {
        data.user = user._id;
        const question = new Question(data);
        data._id = question._id;
        assert.deepEqual(question.toJSON(), data);
        assert.isUndefined(question.validateSync());

    });

    it('required fields', () => {
        const question = new Question({});
        const errors = getErrors(question.validateSync(), 2);
        assert.equal(errors.prompt.kind, 'required');
        assert.equal(errors.user.kind, 'required');
    });

    it('checks that status is an enum', () => {
        const question = new Question({ prompt: 'This is a dad question', user: user._id, status: 'fail' });
        const errors = getErrors(question.validateSync(), 1);
        assert.equal(errors.status.kind, 'enum');
    });
});

