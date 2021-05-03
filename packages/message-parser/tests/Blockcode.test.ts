import { parser } from '../src';
import { bold, paragraph, plain, inlineCode, code } from '../src/utils';

var assert = require('assert');
describe('Blockcode', function () {
  describe('One sigle line of content', function () {
    it('should return the token and the inner text', function () {
      const [tokens] = parser(`\`\`\`
        code
        \`\`\``);
      assert.deepEqual(tokens, code([plain('code')]));
    });
  });

  describe('One sigle line of content', function () {
    it('should return the token and the inner text', function () {
      const [tokens] = parser(`\`\`\`
code
code
\`\`\``);
      assert.deepEqual(
        tokens,
        code([
          plain(`code
code`),
        ])
      );
    });
  });
  describe('Inline Code', function () {
    const snippet = `\`code\``;
    describe(snippet, function () {
      it('should return the token and the inner text', function () {
        const [tokens] = parser(snippet);
        assert.deepEqual(tokens, paragraph([inlineCode(plain('code'))]));
      });
    });
  });
});
