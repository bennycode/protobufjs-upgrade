var protobuf = require('protobufjs');

describe('protobuf.js v5.0.1', function() {

  var buffers = undefined;

  beforeAll(function(done) {
    var file = 'node_modules/wire-webapp-protocol-messaging/proto/messages.proto';

    protobuf.loadProtoFile(file, function(error, builder) {
      if (error) {
        done.fail(error);
      } else {
        buffers = builder.build();
        done();
      }
    });
  });

  it('creates a generic message with text content', function() {
    var text = new buffers.Text('Hello');
    var genericMessage = new buffers.GenericMessage('id');
    genericMessage.set('text', text);

    expect(genericMessage.content).toBe('text');
    expect(genericMessage.message_id).toBe('id');
    expect(genericMessage.text.content).toBe('Hello');

    var buffer = genericMessage.toArrayBuffer();
    var typedArray = new Uint8Array(buffer);
    var expectedArray = new Uint8Array([10, 2, 105, 100, 18, 7, 10, 5, 72, 101, 108, 108, 111]);
    expect(typedArray).toEqual(expectedArray);
  });
});