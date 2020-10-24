<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@rocket.chat/emitter](./emitter.md) &gt; [Emitter](./emitter.emitter.md)

## Emitter class

The event emitter class.

<b>Signature:</b>

```typescript
export declare class Emitter implements IEmitter 
```
<b>Implements:</b> [IEmitter](./emitter.iemitter.md)

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [emit(type, e)](./emitter.emitter.emit.md) |  | Calls each of the handlers registered for the event of <code>type</code> type, in the order they were registered, passing the supplied argument <code>e</code> to each. |
|  [has(key)](./emitter.emitter.has.md) |  | Returns <code>true</code> if this emmiter has a listener attached to the <code>key</code> event type |
|  [off(type, handler)](./emitter.emitter.off.md) |  | Removes the specified <code>handler</code> from the list of handlers of the event of the <code>type</code> type |
|  [on(type, handler)](./emitter.emitter.on.md) |  | Adds the <code>handler</code> function to listen events of the <code>type</code> type. |
|  [once(type, handler)](./emitter.emitter.once.md) |  | Adds a \*one-time\* <code>handler</code> function for the event of the <code>type</code> type. |
