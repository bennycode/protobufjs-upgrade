var protobuf = require('protobufjs');

describe('protobuf.js v6.6.5', function() {

  var buffers = undefined;

  beforeAll(function(done) {
    var file = 'node_modules/wire-webapp-protocol-messaging/proto/messages.proto';

    protobuf.load(file)
      .then(function(root) {
        buffers = root;
        done();
      })
      .catch(done.fail);
  });

  it('creates a generic message with text content', function() {
    var GenericMessage = buffers.lookup('GenericMessage');
    var Text = buffers.lookup('Text');

    var payload = {
      message_id: 'id',
      messageId: 'id',
      text: Text.create({content: 'Hello'})
    };
    var genericMessage = GenericMessage.create(payload);

    expect(genericMessage.content).toBe('text');
    expect(genericMessage.message_id).toBe('id');
    expect(genericMessage.text.content).toBe('Hello');
    expect(GenericMessage.verify(payload)).toBe(null);

    var buffer = GenericMessage.encode(genericMessage).finish();
    var typedArray = new Uint8Array(buffer);
    var expectedArray = new Uint8Array([10, 2, 105, 100, 18, 7, 10, 5, 72, 101, 108, 108, 111]);
    expect(typedArray).toEqual(expectedArray);
  });
});