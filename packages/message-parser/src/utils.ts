import { Paragraph, Types, TypesKeys } from './definitions';

const generate = <Type extends TypesKeys>(type: Type) => (
  value: Types[Type]['value']
): Types[Type] => ({ type, value } as any);

export const paragraph = generate('PARAGRAPH');
export const bold = generate('BOLD');
export const plain = generate('PLAIN_TEXT');
export const italic = generate('ITALIC');
export const strike = generate('STRIKE');
export const code = generate('CODE');
export const codeLine = generate('CODE_LINE');
export const link = generate('LINK');
export const heading = generate('HEADING');
export const inlineCode = generate('INLINE_CODE');
export const quote = generate('QUOTE');

export const mentionUser = generate('MENTION_USER');
export const mentionChannel = generate('MENTION_CHANNEL');

export const reducePlainTexts = (
  values: Paragraph['value']
): Paragraph['value'] =>
  values.reduce((result, item, index, arr) => {
    if (index > 0) {
      const previous = result[result.length - 1];
      if (item.type === 'PLAIN_TEXT' && item.type == previous.type) {
        previous.value = previous.value + item.value;
        return result;
      }
    }

    return [...result, item];
  }, [] as Paragraph['value']);
