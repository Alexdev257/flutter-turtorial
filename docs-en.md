# Flutter review — Detailed summary (Modules 1–12)

Consolidated from course slides, **with exam-oriented structure**: short code examples, common pitfalls, self-check questions. Read alongside [docs.flutter.dev](https://docs.flutter.dev) and [dart.dev](https://dart.dev).

---

## How to use this document

1. Skim **“Quick summary”** at the start of each module for the big picture.
2. Study **details + examples** — the patterns often used in exams and assignments.
3. Work through **self-check questions** — you only truly know it when you can answer in your own words.
4. At the end: **CLI commands**, **HTTP table**, **frequent comparison topics**.

---

## Table of contents

1. [Flutter CLI commands & run modes (shared review)](#flutter-cli-commands-run-modes-shared-review)
2. [Module 1 — Introduction to Flutter](#module-1-introduction-to-flutter)
3. [Module 2 — Dart fundamentals](#module-2-dart-fundamentals)
4. [Module 3 — Advanced Dart](#module-3-advanced-dart)
5. [Module 4 — UI & basic widgets](#module-4-ui-basic-widgets)
6. [Module 5 — Navigation & state management](#module-5-navigation-state-management)
7. [Module 6 — Responsive & Adaptive](#module-6-responsive-adaptive)
8. [Module 7 — Form & Validation](#module-7-form-validation)
9. [Module 8 — REST API & JSON](#module-8-rest-api-json)
10. [Module 9 — Local storage](#module-9-local-storage)
11. [Module 10 — Authentication, sessions & notifications](#module-10-authentication-sessions-notifications)
12. [Module 11 — Testing & debugging](#module-11-testing-debugging)
13. [Module 12 — Performance & deployment](#module-12-performance-deployment)
14. [Common exam comparisons & viva](#common-exam-comparisons-viva)
15. [Quick reference tables](#quick-reference-tables)

---

## Flutter CLI commands & run modes (shared review)

| Command / mode | Meaning |
|----------------|---------|
| `flutter doctor` | Check SDK, Android toolchain, VS Code/Android Studio, devices |
| `flutter pub get` | Fetch dependencies from `pubspec.yaml` |
| `flutter run` | Run the app (defaults to **Debug** — Hot Reload, higher overhead) |
| `flutter run --profile` | Near-release performance; DevTools Performance is meaningful |
| `flutter run --release` | Optimized build, no Hot Reload |
| `flutter build apk --release` | APK for sideloading / internal sharing |
| `flutter build appbundle --release` | **AAB** — Google Play |
| `flutter build apk --analyze-size` | Size analysis (with report) |

**Hot Reload vs Hot Restart**

- **Hot Reload:** injects code and keeps state when possible — fast, good for UI tweaks.
- **Hot Restart:** restarts the Dart isolate — state is lost; needed when changing `main()`, large `initState` logic, or when reload does not “take”.

---

## Module 1 — Introduction to Flutter

### Quick summary

Flutter = UI toolkit, one codebase → many platforms; Skia engine; three-layer architecture; Dart with AOT/JIT and null safety.

### What is Flutter?

- Google’s **UI toolkit**, **natively compiled** apps from **one codebase**.
- Supports Android, iOS, Web, macOS, Linux, Windows.
- Written in **Dart**; **does not** use native widgets to draw the UI (unlike the React Native bridge to native views).
- Renders through the **Skia** engine (consistent pixels across devices).

### Why use Flutter?

| Aspect | Description |
|--------|-------------|
| Fast development | Hot Reload / Hot Restart |
| Polished UI | Material & Cupertino |
| One codebase | Write once, ship many platforms |
| Performance | Near-native (AOT on mobile release) |

### When is Flutter a good fit?

- **Cross-platform** apps with shared UI + logic.
- **MVPs**, startups, rapid prototypes.
- Business apps: e-commerce, booking, dashboards.
- Limited need for very deep hardware/OS APIs; team cannot afford separate Android + iOS devs.

### When is native / another stack more reasonable?

- Very deep OS customization; **games / heavy real-time graphics**; low-level hardware access; UI/UX that must follow each platform guideline pixel-perfect.

### Native integration (Platform Channels)

- Flutter handles **UI + business logic**; **platform-specific** pieces (camera, Bluetooth, NFC, payment SDKs…) can be written in **Kotlin/Java** or **Swift/Obj-C** and called via **MethodChannel / EventChannel**.
- In practice Flutter **does not fully replace** native — **combining** both is common.

### History (slides — grasp the idea)

Sky (2015) → Alpha (2017) → 1.0 (2018) → 2.0 Web/Desktop (2021) → stable Flutter 3.x (2023–2025).

### Three-layer architecture

1. **Framework (Dart):** Widget (`Stateless`/`Stateful`), rendering, layout, foundation. **Everything is a Widget.**
2. **Engine (C++):** Skia, text layout, accessibility, frame sync, GPU.
3. **Embedder:** Hooks the engine into each OS — input, window lifecycle, threads.

**Pipeline summary:** `Widget Tree` → `Element` + `RenderObject` (layout/paint) → compositing → GPU.

### Quick comparison with RN / Native

| | Language | How UI is drawn |
|---|----------|-----------------|
| Flutter | Dart | Flutter engine + Skia |
| React Native | JS/TS | Bridge to native views |
| Native | Kotlin/Swift | System views |

### Dart in Flutter

- Designed for client/UI: **tree shaking**, **sound null safety**.
- **JIT** (dev) + **AOT** (mobile release) — fast iteration, strong release performance.

### Development environment

| Tool | Notes |
|------|-------|
| [DartPad](https://dartpad.dev) | No install; basic widget demos; **no** native plugins |
| VS Code | Lightweight; Flutter/Dart extension; `Flutter: New Project` |
| Android Studio | Full IDE; SDK; emulator; Flutter plugin |

**SDK install:** download from [flutter.dev](https://flutter.dev), unzip, add `bin` to **PATH**, run `flutter doctor` and fix each ✓/✗.

### Project structure

| Path | Role |
|------|------|
| `lib/main.dart` | `runApp()` — entry point |
| `pubspec.yaml` | Dependencies, assets, fonts |
| `android/`, `ios/`, `web/`, … | Native code / per-platform config |
| `test/` | Unit & widget tests |

### Emulator (slide tips)

- Android Studio → Device Manager → create an AVD (e.g. Pixel), API 33+ on capable machines; weaker machines: Pixel 3a / API 30, ~4GB storage.

### Common exam pitfalls

- Confusing Flutter **“compiles native”** with **using native UI widgets** — Flutter paints itself, not 100% XML/Storyboard for the Flutter UI layer.
- **Hot Reload** does not always apply every change (global state, some `main` changes).

### Self-check questions

1. Name Flutter’s three architectural layers and each layer’s role.
2. When should you consider adding native code to a Flutter project?
3. What is `flutter doctor` for?

---

## Module 2 — Dart fundamentals

### Quick summary

`main()`, **systematic types** (numbers, collections, `Object`/`dynamic`/`void`/`Never`), `final`/`const`/`late`, **strings & interpolation** (including raw/multiline), loops (**compare `for` / `for-in` / `forEach` / `while`**), OOP, null safety, collection functional style, exceptions, `Future`/`async`/`await`, **Stream** (single vs broadcast, `listen`, `await for`).

### Program entry

```dart
void main() {
  print('Hello Dart');
}
```

- Everything lives in a **library**; a `.dart` file may use `import`.

### Data types (systematic review)

In Dart, **every value is an object** (including `int`, `bool`), but for exams you can group types by **how you use** them as follows.

#### 1. Numbers and logic

| Type | Range / notes | Examples |
|------|----------------|----------|
| `int` | Integers; size depends on platform (often 64-bit) | `-1`, `42`, `0xFF` |
| `double` | IEEE 754 floats; **no** separate `float` type | `3.14`, `1.2e3` |
| `bool` | Only `true` / `false` — **not** `0`/`1` like C | `if (ok) ...` |

#### 2. Strings `String`

- Strings are **immutable**: “mutating” really creates a new `String`.
- Stored internally as **UTF-16** code units; `length` counts **code units**, not always “grapheme count” in every language (study Unicode in advanced courses if required).

#### 3. Collections (all can use **generics** `List<T>`, `Set<T>`, `Map<K,V>`)

| Type | Behavior | Exam notes |
|------|----------|------------|
| `List` | Ordered, duplicates allowed | `[]`, `[1, 2]` |
| `Set` | No duplicates; order not like a fixed list | `{1, 2}`, `{1, 1, 2}` → `{1, 2}` |
| `Map` | key → value; keys unique | `{'id': 1}` |
| `Iterable<T>` | Abstract “can be iterated” | `List`, `Set`, `map()`/`where()` return lazy iterables |

#### 4. `enum`

```dart
enum Status { pending, done, error }
```

- Compare with `==` within the same enum; Dart 3 has **enhanced enums** (fields/methods) if your course covered them.

#### 5. Special types (common theory questions)

| Type | Meaning | Notes |
|------|---------|--------|
| `Object` | Ancestor of (almost) every type | Every value is an `Object` |
| `dynamic` | **Disables static checking** — any method/property call; errors surface at runtime | Avoid abuse; only when truly needed (raw JSON, interop) |
| `void` | “No meaningful return value” — used for **side effects** | `void main()` |
| `Null` | Only the value `null` | With null safety, often `T?` |
| **`Never`** | **Bottom type: no valid value exists** | For functions that **never return normally** — see below |

---

### Variables: `var`, `final`, `const`

```dart
var name = 'FPT'; // suy luận String
final year = DateTime.now().year; // gán 1 lần, giá trị runtime
const pi = 3.14; // hằng compile-time
```

- **`late`** (extra): declare a non-nullable variable assigned later; used when init depends on `initState` or lifecycle (common in Flutter).
- **`const` widgets** in Flutter let the framework skip rebuilds when arguments are unchanged (see Module 12).

---

### Type `Never` — clarified for exams

`Never` is **not** “a special memory cell” like `var`; it is a **return type** (or expression type) meaning: **execution cannot complete normally with a value**.

| Compare | `void` | `Never` |
|---------|--------|---------|
| Function “returns no value to caller” | Yes — usually runs to completion or `return;` | No — **no** normal return path |
| Typical example | `void log(String m) { print(m); }` | Function **always throws**, infinite loop, or `exit` |

```dart
Never fail(String msg) {
  throw Exception(msg); // không có return bình thường
}

// Hàm kiểu Never thường dùng để "chấm dứt" luồng: throw / không bao giờ return
```

- The compiler uses `Never` for **sound type inference** (e.g. after `fail()`, code below may be treated as **unreachable** in some analyses).
- **Do not confuse** with `void`: `void f()` **finishes and returns** (no data); `Never g()` **never** completes successfully.

---

### Strings & interpolation (detailed)

#### Quotes and multiline strings

- A string may use **single** `'...'` or **double** `"..."` quotes — functionally equivalent for basics.
- **Multiline** strings use triple quotes:

```dart
final sql = '''
SELECT *
FROM users
WHERE id = ?
''';
```

#### Interpolation

- **`$variableName`**: inserts a simple variable / getter (valid identifier).
- **`${expression}`**: inserts **any expression** — required for property access, calls, or non-simple names.

```dart
final name = 'Nam';
final s1 = 'Xin chao $name';           // → Xin chao Nam
final s2 = 'Do dai: ${name.length}';   // bắt buộc có {}
final s3 = 'Tong: ${2 + 3}';           // → Tong: 5
```

- To print a literal **`$`** without starting interpolation, often use **`\\$`** in a normal string, or concatenate / `String.fromCharCode(36)` — see [Dart: Strings](https://dart.dev/guides/language/language-tour#strings).

#### Raw strings `r'...'`

- The `r` prefix means **escape sequences** (`\n`, `\t`, `\\`, …) are **not** processed — common for **regex** or Windows paths with many `\`.
- **Interpolation** `$name` / `${...}` **still works** in raw strings; raw only disables **`\`**, not `$`.

```dart
final path = r'C:\Users\name\file.txt'; // giữ nguyên dấu \ trong file path
```

#### Common `String` APIs

| API | Effect |
|-----|--------|
| `length` | Length (code units) |
| `isEmpty` / `isNotEmpty` | Quick checks |
| `substring(start, [end])` | Substring |
| `split(pattern)` | Split to `List<String>` |
| `trim()` | Trim leading/trailing whitespace |
| `contains`, `startsWith`, `endsWith` | Simple search |
| `toUpperCase()` / `toLowerCase()` | Case change |

---

### Operators (quick review)

- Arithmetic: `+ - * / %`; integer division `~/`.
- Comparison: `== != < > <= >=`.
- Logic: `&& || !`.
- Null: `?.`, `??`, `!`, `??=`.

### Control flow: `if` / `else` / `switch`

- `if (condition) { } else { }` — condition must be a `bool` expression (no implicit numeric truthiness like C).
- `switch (x) { case a: ...; break; default: ... }` — remember **`break`** (or `continue`, `return`, `throw`) so you do not fall through unintentionally.
- Dart 3 has **pattern matching** in `switch` if taught; otherwise classic form above is enough.

### Loops — detailed comparison (exams)

#### Overview table

| Style | Suggested syntax | Strengths | Limits / notes |
|-------|------------------|-----------|----------------|
| **Classic `for`** | `for (var i = 0; i < n; i++) { }` | Control **index**, step (`i += 2`), complex condition | Verbose when you only need to visit elements |
| **`for-in`** | `for (final x in list) { }` | Short, readable — any **Iterable** | No built-in index (use `asMap()` or classic `for`) |
| **`while`** | `while (condition) { }` | Iteration count **not fixed** upfront (read file, wait) | Easy to forget updates → infinite loop |
| **`do-while`** | `do { } while (condition);` | **Runs at least once** before check | Less common than `while` in typical UI code |
| **`forEach`** | `list.forEach((e) { ... });` | Functional style, neat for **side effects only** | **`return` in the closure only exits that callback**, not the outer function; **no** natural `break`/`continue` like a `for` loop |

#### `for-in` vs `forEach`

- **`for-in`** is **loop syntax** — `break`, `continue`, `await` (inside `async`) work naturally.
- **`forEach`** takes a **callback** — `return` only ends **one callback invocation**, not the enclosing function (unless you use labels or refactor).

```dart
// for-in: break thoát vòng lặp
for (final x in [1, 2, 3]) {
  if (x == 2) break;
}

// forEach: 'return' chỉ skip phần còn lại của callback cho phần tử hiện tại
[1, 2, 3].forEach((x) {
  if (x == 2) return; // không dừng toàn bộ forEach như break
  print(x);
});
```

#### When to use what?

- Need an **index** (`0..length-1`) → classic `for` or `for (var i = 0; i < list.length; i++)`.
- Only need to **visit every element** → **`for-in`** (preferred for clarity).
- Need **lazy** / functional chains → `map`, `where` (remember laziness — see Collections).
- Unknown iteration count → `while` / `do-while`.

### Functions

```dart
int add(int a, int b) => a + b;

void greet({String name = 'Guest'}) => print(name);
```

- **Optional positional** `[Type? x]`; **named** `{required String name}` or defaults.

### OOP

```dart
class Point {
  final int x, y;
  Point(this.x, this.y);
  Point.origin() : x = 0, y = 0;
}

class Dog extends Animal {
  @override
  String sound() => 'Woof';
}
```

### Null safety

- `String` **cannot** hold `null`; `String?` can.
- `value?.length` — short-circuits if null.
- `name ?? 'Unknown'` — fallback value.
- `name!` — force non-null (**only** when sure; wrong use crashes at runtime).

### Collections: `map`, `where`, `fold`

```dart
final nums = [1, 2, 3];
final doubled = nums.map((e) => e * 2).toList();
final evens = nums.where((e) => e.isEven);
```

- `map`/`where` on `Iterable` are **lazy** until you call `toList()`, `for-in`, etc.

### Exceptions

```dart
try {
  throw FormatException('bad');
} on FormatException catch (e) {
  print(e);
} catch (e, st) {
  print(st);
} finally {
  print('done');
}
```

### Async: `Future` & `async`/`await`

```dart
Future<String> fetch() async {
  await Future<void>.delayed(const Duration(seconds: 1));
  return 'Done';
}

Future<void> main() async {
  print(await fetch());
}
```

- An **`async`** function wraps its return in a `Future` (except `void async` — watch for unawaited futures).

### Stream — more detail

#### `Future` vs `Stream`

| | `Future<T>` | `Stream<T>` |
|---|-------------|-------------|
| Number of values | **One** value (or error) in the future | **Zero or many** values over time |
| Use for | One HTTP request, one DB read | Socket, logs, GPS, clocks, `StreamBuilder` |

#### Two stream kinds (very common on exams)

1. **Single-subscription (default)**  
   - Only **one** listener in sequence.  
   - Listening twice often errors (stream already consumed or not allowed).

2. **Broadcast**  
   - **Many** listeners at once (e.g. several widgets).  
   - Created with `StreamController.broadcast()` or designed broadcast streams.

#### Common ways to create streams

- **Async generator** `async*` + `yield` — each `yield` emits one event:

```dart
Stream<int> countDown() async* {
  for (var i = 3; i >= 1; i--) {
    await Future<void>.delayed(const Duration(seconds: 1));
    yield i;
  }
}
```

- **Sync iterable to stream:** `Stream.fromIterable([1, 2, 3])`.
- **Periodic:** `Stream.periodic(Duration(seconds: 1), (i) => i)` — clock ticks.

#### Listening: `listen` vs `await for`

- **`stream.listen(...)`** — registers callbacks, returns `StreamSubscription` (can **`cancel()`**).

```dart
final sub = countDown().listen(
  (data) => print(data),
  onError: (e, st) => print(e),
  onDone: () => print('done'),
  cancelOnError: false,
);
// Khi không cần nữa:
await sub.cancel();
```

- **`await for (final x in stream)`** — only inside an **`async`** function; sequentially reads until the stream closes (good for linear code).

```dart
Future<void> printAll(Stream<int> s) async {
  await for (final x in s) {
    print(x);
  }
}
```

#### `StreamController` (manual events)

```dart
final c = StreamController<int>();
c.stream.listen(print);
c.add(1);
c.add(2);
await c.close();
```

- **`StreamController.broadcast()`** — multiple listeners; use when several places listen to one event stream.

#### Common transforming APIs (quick review)

| API | Meaning |
|-----|---------|
| `map` | Map each element |
| `where` | Filter |
| `take(n)` | First `n` elements |
| `asyncMap` | Each element → a `Future` (avoid stalls if used correctly) |
| `distinct` | Drop consecutive duplicates (when applicable) |

#### Flutter connection

- **`StreamBuilder<T>`** — rebuilds UI on each new stream snapshot (like `FutureBuilder` but many events).  
- **Note:** avoid creating a new `Stream` in `build()` on every rebuild unless intentional — easy to **re-subscribe** / waste work.

### Common exam pitfalls

- `final` vs `const`: `const` requires a **fully** compile-time expression.
- Forgetting `.toList()` after `map` when you need a concrete `List`.
- Using `!` instead of safe null handling → easy to lose points for “best practice”.
- **`Never` vs `void`:** `void` = no return data but the function **still completes**; `Never` = **no** successful return path (usually `throw` / non-termination).
- **`forEach`:** `return`/`break` **do not** behave like a classic `for` — easy to mistake when trying to “stop early”.
- **Single-subscription stream:** listening twice can error; use broadcast when **many** listeners share one stream.

### Self-check questions

1. Difference between `final` and `const`? Give an example where `const` is invalid with `DateTime.now()`.
2. How do `?.` and `??` differ?
3. Why does `async` help keep the Flutter UI responsive when calling the network?
4. Distinguish `void` and `Never` (give a `throw` example).
5. When choose `for-in` over `forEach`?
6. How does a single-subscription stream differ from broadcast? Give an example using `StreamController.broadcast()`.

---
## Module 3 — Advanced Dart

### Quick summary

Abstract class, implicit interface, `extends` / `implements` / `mixin`, factory, generics, **collection `if` / `for` / spread** (`...`, `...?`, List–Set–Map, Flutter `children`), custom exceptions, event loop (microtask vs event), Future chaining, Stream + repository pattern.

### Abstract class

```dart
abstract class Shape {
  double area();
}

class Circle implements Shape {
  Circle(this.r);
  final double r;
  @override
  double area() => 3.14 * r * r;
}
```

- In Flutter, `State<T>` is abstract — you `@override` `build()`.

### Implicit interface

- Every Dart class is also an **interface**. `implements X` requires you to **re-implement all** public APIs of `X`, without inheriting implementation.

### `extends` vs `implements` vs `with`

| Keyword | Inherit implementation? | When to use |
|---------|-------------------------|-------------|
| `extends` | Yes (one class) | Extend an existing class |
| `implements` | No | Same “contract”, you write bodies |
| `with Mixin` | Yes (from mixin) | Reuse cross-cutting behavior |

### Mixin & `on` (constraint)

```dart
mixin Walk on Animal {
  void walk() => print('$runtimeType walking');
}
```

- `on Animal` — only subclasses of `Animal` may use `with Walk`.

### Factory constructor

```dart
class User {
  User._(this.name);
  final String name;

  factory User.fromJson(Map<String, dynamic> json) {
    return User._(json['name'] as String);
  }
}
```

- Use for: **singletons**, JSON parsing, returning cached instances, or subtypes.

### Generics

```dart
class Box<T> {
  Box(this.value);
  T value;
}

class Cage<T extends Animal> {
  Cage(this.pet);
  final T pet;
}
```

### Collection `if`, `for`, spread (detailed)

This is **inside literals** for `List`, `Set`, or `Map`: you can embed **conditions**, **loops**, and **spread** from another collection without a temporary list + `addAll`.

#### 1. Spread `...` — flatten elements

- **`...iterable`:** inserts **each** element of the iterable into the collection being built.
- Use when **concatenating** lists/sets or prepending/appending a list into a literal.

```dart
final base = [1, 2, 3];
final extended = [0, ...base, 4]; // [0, 1, 2, 3, 4]

final tags = {'a', 'b'};
final allTags = {...tags, 'c'}; // Set: a, b, c
```

- **Null-aware spread `...?`** (Dart 2.3+): if the value may be **`null`**, use `...?` to **skip** when null instead of erroring.

```dart
List<int>? optional;
final x = [1, ...?optional, 2]; // [1, 2] nếu optional == null
```

#### 2. Collection `if` — conditional elements

- **`if (condition) element`:** adds **one** element when true.
- **`if (condition) ...iterable`:** adds **many** elements (spread inside the `if`).

```dart
final showDebug = true;
final items = [
  'release',
  if (showDebug) 'debug', // có 1 phần tử
  if (showDebug) ...['log', 'trace'], // thêm 2 phần tử
];
// ['release', 'debug', 'log', 'trace']
```

- **`if / else` in literals:** the `else` branch can be one element or `...list`.

```dart
final mode = 'dark';
final themeChips = [
  if (mode == 'dark') 'Dark' else 'Light',
];
```

#### 3. Collection `for` — generate elements

- **`for (loop) element`:** each iteration can emit **one** (or many with `...`) elements.

```dart
final base = [1, 2, 3];
final doubled = [for (final x in base) x * 2]; // [2, 4, 6]

// Kết hợp index (for cổ điển trong collection for)
final withIndex = [
  for (var i = 0; i < base.length; i++) '$i:${base[i]}',
];
```

- You can nest **`if` inside `for`** (inline filter):

```dart
final nums = [1, 2, 3, 4];
final evens = [for (final n in nums) if (n.isEven) n]; // [2, 4]
```

#### 4. Using `Map` literals

- Spread map: **`...otherMap`** merges keys/values.
- `for` in map: each round can be **`key: value`** (one entry) or patterns per your Dart version.

```dart
final defaults = {'theme': 'light', 'lang': 'vi'};
final user = {'name': 'An'};
final merged = {
  ...defaults,
  ...user,
  'role': 'student',
};

// Map literal với for: mỗi vòng tạo một cặp key: value
final squares = {for (final n in [1, 2, 3]) n: n * n}; // {1:1, 2:4, 3:9}
```

#### 5. Flutter — `children:` of `Column` / `Row`

Often used to **show/hide** widgets or **loop** widgets without a verbose `build` helper:

```dart
Column(
  children: [
    const Text('Tiêu đề'),
    if (isLoading) const CircularProgressIndicator(),
    if (!isLoading) Text(body),
    for (final item in items) ListTile(title: Text(item)),
  ],
)
```

- Note: each `children` entry must still be a **`Widget`**; `if`/`for` only build the **widget list** more cleanly.

#### 6. `const` collections and these features

- A literal with leading **`const`** is only valid if **everything** inside is a **compile-time constant** (no runtime calls, no `showDebug` from `State` unless it is `const bool`).
- In Flutter, `children: const [ Text('A'), ]` works; `if (flag)` with `flag` from `State` means you **cannot** wrap the whole list in `const` — only `const` individual children when possible.

#### 7. Quick recap

| Syntax | Effect |
|--------|--------|
| `...x` | Spread elements of `x` into list/set/map |
| `...?x` | Spread if `x` is non-null |
| `if (c) e` | Insert `e` when `c` is true |
| `if (c) ...iterable` | Insert many when `c` is true |
| `for (...) e` | Loop-generated elements |

### Custom exception

```dart
class LoginException implements Exception {
  LoginException(this.message);
  final String message;
}
```

### Event loop: microtask vs event (detailed)

Dart runs in an **isolate** (think “single Dart thread”): at any moment only **one synchronous Dart chunk** runs. Anything “run later” (`await` continuations, `then`, timers, I/O…) is queued for the **event loop**.

#### Two main queues

| Queue | English name | Relative priority | Usually contains |
|-------|----------------|-------------------|------------------|
| **Microtask** | Microtask queue | **Higher** — **drained** before the next “big” event | `scheduleMicrotask`, `Future.microtask`, and much of the chaining after a `Future` completes (internal `async`/`await` behavior) |
| **Event** | Event queue | After **all** pending microtasks in that turn | `Future(() { ... })` constructor, **timers** (`Future.delayed`), **I/O**, system input, many Flutter engine/framework callbacks |

**Core rule (exam model):**

1. Run all current **synchronous** code (e.g. from start of `main()` until it yields).
2. **Loop:** while microtask queue **non-empty** → dequeue and run; running may **enqueue** more microtasks — **keep draining** until empty.
3. When microtask queue **empty** → dequeue **one** **event** from the **event queue** and run it.
4. Go back to step 2.

```text
[ Đồng bộ ] → [ Dọn sạch microtask queue ] → [ 1 sự kiện event ] → [ Dọn sạch microtask ] → …
```

#### Classic example (like slides)

```dart
import 'dart:async';

void main() {
  print('A');
  scheduleMicrotask(() => print('micro'));
  Future(() => print('future'));
  print('B');
}
```

**Prints:** `A`, `B`, `micro`, `future`.

**Short explanation:**

- `A` and `B` are **synchronous** → print immediately.
- `scheduleMicrotask` queues `micro` on the **microtask queue**.
- `Future(() => ...)` queues `future` on the **event queue** (does not run yet).
- After sync code finishes, the loop **drains microtasks** → prints `micro`.
- Microtasks empty → take **one** event → prints `future`.

#### Adding a microtask after an event

```dart
void main() {
  print('1');
  scheduleMicrotask(() => print('micro-A'));
  Future(() {
    print('event-1');
    scheduleMicrotask(() => print('micro-B'));
  });
  scheduleMicrotask(() => print('micro-C'));
  print('2');
}
```

Typical order: `1`, `2`, `micro-A`, `micro-C` (same microtask batch after sync), then `event-1`, then drain microtasks again → `micro-B`.  
*(If an exam demands exact line order, run on a machine — the key idea is **microtasks run before the next event** after synchronous code completes.)*

#### Choosing a queue deliberately

| API | Queue (exam view) |
|-----|-------------------|
| `scheduleMicrotask(() { ... })` | Microtask |
| `Future.microtask(() { ... })` | Microtask |
| `Future(() { ... })`, `Future.delayed(...)` | Event |
| `Timer.run`, `Timer.periodic` | Event |

#### Why microtasks?

- Lets **async steps chain tightly** (after Futures) before handling other input/timers — avoids unwanted interleaving.
- **Risk:** infinite microtask loops (each microtask schedules another) can **starve** the event queue → UI/timers “freeze”.

#### Flutter tie-in (debug mindset)

- `setState` runs **synchronously** in the call; **painting** is scheduled by the engine/framework — not “only microtasks”, but ordering among **`await` / `Future((){})` / `addPostFrameCallback`** still follows the event loop.
- `WidgetsBinding.instance.addPostFrameCallback` runs **after the frame is painted** — common when you need `context.size` after layout; with many `Future`s and microtasks remember: **sync first → drain microtasks → then events**.

#### One-liner for multiple-choice

- After a **synchronous** block, **always process all pending microtasks** before running a **`Future(() {})`** callback from the **event queue**.

### Future chaining

```dart
Future.value(1).then((v) => v + 1).then(print); // 2
```

### Stream: `async*` & broadcast

```dart
Stream<int> count() async* {
  for (var i = 1; i <= 3; i++) yield i;
}
```

### Repository pattern

```text
UI (Widget) → Repository → API / DB / Local
```

- UI should **not** scatter `http.get` calls; the repository **centralizes endpoints + parsing + errors**.
- Tests: mock the repository, not the whole Flutter framework.

### Common exam pitfalls

- `implements` a large class but only override part → **compile error**.
- Confusing **single-subscription** stream with broadcast — double listen errors.
- **`...list` vs `list`:** putting `list` (no spread) in a literal gives **one nested `List` element**, not flattened items.
- **`...?`:** forgetting it when the iterable may be `null` → runtime error or longer `if (x != null) ...x!`.
- **`const [...]`** with `if (stateVariable)` — cannot force `const` on the whole list if the condition is runtime.

- Confusing **`Future(() {})`** with **`Future.microtask`** — both “run later” but **different queues** → different log order.

### Self-check questions

1. Why does a repository make testing easier than calling HTTP inside `build()`?
2. In the `A`/`B`/`micro`/`future` example, why does `micro` print **before** `future`?
3. How does a factory constructor differ from a default constructor?
4. Difference between `[...a]` and `[a]` when `a` is `List<int>`?
5. Write a `Column` whose `children` use `if` and `for` (pseudo-code).
6. State the rule about draining microtasks before taking another event from the event queue; what happens if `scheduleMicrotask` nests forever?

---

## Module 4 — UI & basic widgets

### Quick summary

Everything is a widget; `StatelessWidget` / `StatefulWidget` + **`setState` (when to call, `mounted`, async, avoid in `build`)**; Scaffold, Theme; ListView; input controls; common layout errors.

### Two core widget kinds

| Kind | When to use | UI updates? |
|------|-------------|-------------|
| `StatelessWidget` | Pure display, no internal state | Only when parent rebuilds |
| `StatefulWidget` | State changes with interaction | `setState(() { ... })` |

```dart
class Counter extends StatefulWidget {
  const Counter({super.key});
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int n = 0;
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('$n'),
        ElevatedButton(
          onPressed: () => setState(() => n++),
          child: const Text('+'),
        ),
      ],
    );
  }
}
```

### `setState` — detailed

`setState` is a method on **`State<T>`** (only for **`StatefulWidget`**). It tells Flutter: **this widget’s internal state changed**, so **re-run** the UI described by this `State`’s `build`.

#### What does `setState` do? (exam model)

1. Update **fields stored on `State`**.
2. Call **`setState(() { ... })`** — the callback usually performs assignments (or you mutated before with an empty callback — **not recommended** for readability).
3. The framework **marks** the corresponding `Element` dirty, then on the **next frame** (or coalesced) calls **`build(context)`** again for that `State`.
4. The widget subtree is **compared** with the previous tree; only differences update the screen.

**One-liner:** `setState` = “state changed, rerun `build` for this stateful widget”.

#### Syntax and good habits

```dart
void _increment() {
  setState(() {
    _count++;
  });
}

// Cũng hay gặp (một biểu thức):
onPressed: () => setState(() => _count++),
```

- **Do** put **all state changes that affect UI** in the same `setState` (or one grouped call) for traceability.
- **Avoid** empty `setState` after mutating elsewhere — works but confuses readers in exams.

#### Where **not** to call `setState`

| Situation | Why |
|-----------|-----|
| Inside **`build()`** | Risk **infinite loop**: `build` → `setState` → `build` → … |
| After **`dispose()`** | State is gone → **“setState() called after dispose()”** |
| When **`mounted == false`** | Widget not in tree — `setState` may throw / wrong logic |

#### `async` + `setState`: remember **`mounted`**

After `await`, the widget may have been **popped** or **disposed** — check before updating UI:

```dart
Future<void> _load() async {
  setState(() => _loading = true);
  final data = await api.fetch();
  if (!mounted) return;
  setState(() {
    _loading = false;
    _data = data;
  });
}
```

#### Rebuild scope (see Module 12)

- `setState` triggers rebuild for **the `State` that called it** — the subtree starting from that **`StatefulWidget`’s `build`**, not the whole `MaterialApp` (unless state is very high or parents rebuild too).
- If “fat” state lives on one `State`, the **whole screen** may rebuild often — for performance, **split child widgets** or use **Provider/Selector** (Modules 5, 12).

#### Quick comparison with alternatives

| Approach | When |
|----------|------|
| `setState` | State **only** used in one screen / small subtree |
| `Provider` / `ChangeNotifier` | State shared **across screens** or distant widgets |
| `InheritedWidget` | Pass data down the tree (Provider builds on this) |

### Minimal Material app

```dart
void main() => runApp(const MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Demo')),
        body: Center(child: Text('Hello')),
      ),
    ));
```

### Common widgets (slide grouping)

- **Display:** `Text`, `Image.asset` / `Image.network` + `fit: BoxFit.cover`, `Icon`, `Card`, `ListTile`, `CircleAvatar`.
- **Input / controls:** `TextField`, `Switch`, `Slider`, `RadioListTile`, `showDatePicker`, `showTimePicker`.
- **Layout:** `Row`, `Column`, `Expanded`, `Flexible`, `Padding`, `SizedBox`, `Stack` + `Positioned`, `Wrap`, `ListView`, `ListView.builder`.

### ListView inside Column

**Error:** `Vertical viewport was given unbounded height`.

**Common fixes:**

- Wrap `ListView` with `Expanded` (inside a `Column` with bounded height).
- Or `ListView(shrinkWrap: true, physics: const NeverScrollableScrollPhysics())` inside a parent scroll (watch performance).

### Theme & dark mode

- `MaterialApp(theme: ..., darkTheme: ..., themeMode: ThemeMode.system)`.
- `Theme.of(context).colorScheme` — Material 3 colors.

### IDE: Wrap with Widget

- VS Code / Android Studio: quick wrap with `Padding`, `Center`, `Expanded` — saves time in practical exams.

### Common exam pitfalls

- Mutating state but **forgetting `setState`** → UI unchanged.
- Calling **`setState` inside `build()`** → **infinite loop** / crash risk.
- After **`await`** without **`mounted`** check → possible **`setState` after dispose**.
- Calling `showDatePicker` without `await` or without a valid `context`.
- `ListView` with unbounded height inside `Column` without `Expanded`.

### Self-check questions

1. Difference between `StatelessWidget` and `StatefulWidget`?
2. Where do you call `setState`, and what does the framework do next (briefly)?
3. Why must you not call `setState` inside `build()`?
4. After `await` in `State`, what should you check before `setState`?
5. Name two ways to fix `ListView` inside `Column`.

---

## Module 5 — Navigation & state management

### Quick summary

**Navigator 1.0:** route stack — `push` / `pop` / `pushReplacement` / `pushAndRemoveUntil`; **`MaterialPageRoute`**; **passing data** (constructor, `arguments`, `onGenerateRoute`); **named routes**; **Navigator 2.0** (idea: declarative stack + URL); **deep links** Android/iOS; state: **lifting state**, **`InheritedWidget`**, **Provider** (`ChangeNotifier`, `read` / `watch` / `Selector`).

---

### Overview: why Navigator?

- Each “screen” is usually a **route** on a **stack** (stack of pages).
- **Forward** = **push** a route onto the stack; **back** = **pop** the top route.
- **`BuildContext`** finds the nearest `Navigator` (`Navigator.of(context)`).

---

### Navigator 1.0 — stack & `Route`

- **`Route`:** describes a screen (animation, barrier, fullscreen dialog…).
- **`PageRoute`:** route bound to a page — often **`MaterialPageRoute`** (Material motion), **`CupertinoPageRoute`** (iOS style).

```dart
Navigator.push(
  context,
  MaterialPageRoute<void>(
    builder: (context) => const DetailPage(movieId: 42),
  ),
);
```

#### Common APIs (review table)

| API | Effect | Notes |
|-----|--------|--------|
| `push` | Push a new route on **top** | Returns `Future<T?>` — **result** when child `pop`s |
| `pop` | Remove top route; can `pop(context, result)` | `result` returned to `await push` |
| `maybePop` | Pop if allowed | Returns `Future<bool>` |
| `canPop` | Whether a pop is possible | |
| `pushReplacement` | **Replace** current route with a new one (depth unchanged) | After login, change flow “root” |
| `pushAndRemoveUntil` | Push then **remove** routes below until predicate | Go Home and clear old stack |
| `popUntil` | Pop until predicate true | |

#### Receiving a result from a child screen

```dart
final result = await Navigator.push<String>(
  context,
  MaterialPageRoute(builder: (_) => const EditPage()),
);
if (result != null) { /* cập nhật */ }
```

```dart
// Ở màn con khi xong:
Navigator.pop(context, 'saved');
```

---

### Passing data to another screen

| Approach | Pros | Cons |
|----------|------|------|
| **Constructor args** in `builder: (_) => DetailPage(id: id)` | Clear, type-safe | Needs direct `builder` |
| **`settings.arguments`** (named route) | Central route names | Often needs **`as` casts** / runtime checks |
| **`onGenerateRoute`** | Parse URL / complex objects | More code |

**Named** + `arguments` example:

```dart
Navigator.pushNamed(context, '/detail', arguments: 42);

// Trong builder route hoặc màn đích:
final id = ModalRoute.of(context)!.settings.arguments as int;
```

---

### Named routes & `MaterialApp`

```dart
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (_) => const HomePage(),
    '/detail': (_) => const DetailPage(), // tĩnh — khó truyền tham số động
  },
  onGenerateRoute: (settings) {
    if (settings.name == '/detail') {
      final id = settings.arguments as int?;
      return MaterialPageRoute<void>(
        builder: (_) => DetailPage(id: id ?? 0),
        settings: settings,
      );
    }
    return null;
  },
  onUnknownRoute: (_) => MaterialPageRoute(
    builder: (_) => const NotFoundPage(),
  ),
);
```

- **`routes`:** name → widget — usually screens **without** required dynamic args.
- **`onGenerateRoute`:** when you need **`settings.arguments`** or **deep link** parsing → custom `Route`.
- Always pass **`settings: settings`** into `MaterialPageRoute` from `onGenerateRoute` — keeps `ModalRoute.of(context).settings` consistent.

---

### Navigator 2.0 — concepts (theory)

| Navigator 1.0 | Navigator 2.0 (newer API) |
|---------------|-----------------------------|
| **Imperative** steps: `push` / `pop` | Describe the **desired route stack** (declarative) |
| Hard to sync complex deep links with URL | Fits **web** (URL path ↔ stack), browser back/forward |
| Easier to learn, enough for many mobile apps | Needs `Router`, `RouterDelegate`, `RouteInformationParser`… — steeper curve |

**For exams:** know **2.0 syncs UI with URL / declarative stack**; memorize full boilerplate only if required.

---

### Deep linking (Android & iOS)

#### Android

- File: **`android/app/src/main/AndroidManifest.xml`** (inside `MainActivity` `<activity>`).
- Add **`<intent-filter>`** with:
  - `<action android:name="android.intent.action.VIEW" />`
  - `<category android:name="android.intent.category.DEFAULT" />`
  - `<category android:name="android.intent.category.BROWSABLE" />`
  - `<data android:scheme="movieapps" android:host="movies" />` (slide example)
- Meaning: system can open `movieapps://movies?id=12` into the app; Flutter receives the URI (handle in `onGenerateRoute` / plugin).

**Quick test:**

```text
adb shell am start -a android.intent.action.VIEW -d "movieapps://movies?id=12"
```

#### iOS

- **Universal Links:** enable **Associated Domains** in Xcode (`applinks:yourdomain.com`).
- **Custom URL scheme:** declare **URL Types** in **Info.plist** (`CFBundleURLSchemes` e.g. `movieapps`).
- Flutter receives links via platform plumbing → often maps to **initial route** or **push** by path.

---

### State management (slides + exam extensions)

#### 1. `setState` (Module 4)

- State **only in one widget branch** → `setState` is enough.

#### 2. Lifting state up

- Move shared state to the **nearest ancestor** that **owns both** child branches.
- When it changes, ancestor `setState` → **whole subtree** rebuilds (watch perf if state is “large”).

#### 3. `InheritedWidget`

- **Push data down** without threading every constructor.
- Children call **`context.dependOnInheritedWidgetOfExactType<MyData>()`** (or equivalent) → **subscribe** to rebuilds when the `InheritedWidget` updates.
- **Provider** packages this pattern + `ChangeNotifier` — rarely hand-write `InheritedWidget` in homework.

#### 4. Provider + `ChangeNotifier`

```dart
class CounterModel extends ChangeNotifier {
  int count = 0;
  void inc() {
    count++;
    notifyListeners(); // báo cho widget đang listen rebuild
  }
}

// Gốc app (thường bọc MaterialApp)
ChangeNotifierProvider(
  create: (_) => CounterModel(),
  child: const MyApp(),
);
```

**Reading values:**

| API | Rebuild on `notifyListeners`? | When |
|-----|-------------------------------|------|
| **`context.watch<CounterModel>()`** | **Yes** | In `build` when UI depends on the model |
| **`context.read<CounterModel>()`** | **No** | In callbacks (`onPressed`, one-shot `initState`) — call methods only |
| **`Consumer<CounterModel>`** | Only subtree in `builder` | Narrow rebuild scope |
| **`Selector<CounterModel, int>`** | Only when selected slice changes | Fewer rebuilds (Module 12) |

```dart
// Chỉ rebuild khi count đổi (ví dụ ý tưởng)
Selector<CounterModel, int>(
  selector: (_, m) => m.count,
  builder: (_, count, __) => Text('$count'),
);
```

- **`MultiProvider`:** wrap several `ChangeNotifierProvider` / `Provider` instances.

#### 5. When to use what? (summary)

| Need | Suggestion |
|------|------------|
| State for 1–2 widgets on one screen | `setState` |
| Share state across widgets / screens | **Provider** (or Riverpod/BLoC if taught) |
| Read theme / locale from context | `Theme.of`, `Localizations` (similar inherited mechanism) |

---

### Navigation + auth (slide pattern)

- After successful login: **`pushReplacement`** or **`pushNamedAndRemoveUntil(..., (route) => false)`** to **remove Login** from the stack — avoid **Back** returning to the password screen.
- Combine with **Provider** holding `User?` / `isLoggedIn`; `MaterialApp` `home` or initial route depends on state (watch full-app rebuilds — consider an `AuthGate`).

---

### System back button (extra)

- On Android you may need **`PopScope`** / (legacy: `WillPopScope`) to **confirm exit** or **conditional navigation** — depends on Flutter version in the exam.

---

### Common exam pitfalls

- Using **`push`** for login → **Login** remains below → Back returns to login.
- **`watch`** at `MyApp` root `build` → every model change **rebuilds the whole tree** → slow (use `read` where UI does not depend, or `Selector`).
- **`read` in `build`** expecting model-driven rebuilds → **wrong** — use `watch` or `Consumer`.
- Passing **`arguments`** but forgetting cast / null check → runtime errors.
- Confusing **`pushReplacement`** with **`push`** (different stack depth).

---

### Self-check questions

1. Difference between `push` and `pushReplacement`? After login, which fits?
2. `read` vs `watch` in Provider — wrong choice consequences?
3. How do you get a **result** from a child after `Navigator.push`?
4. Static `routes` vs `onGenerateRoute` — when?
5. List three pieces commonly found in an Android deep-link `intent-filter` (action + category + data).
6. What problem does Navigator 2.0 solve for **URL/web** that Navigator 1.0 struggles with?

---

## Module 6 — Responsive & Adaptive

### Quick summary

**Responsive** = layout changes with **available space** (width, constraints). **Adaptive** = changes with **device / platform type** (phone vs tablet, Material vs Cupertino). Tools: **`MediaQuery`**, **`LayoutBuilder`**, **`OrientationBuilder`**, **`SafeArea`**, **`GridView`**, **`Wrap`**, **`Flexible`/`Expanded`**.

---

### Responsive vs Adaptive — precise distinction

| Concept | Based on | Concrete example |
|---------|----------|------------------|
| **Responsive** | **Viewport size** (often `width` or `constraints.maxWidth`) | `width < 600` → 1 column; `≥ 600` → 2 columns with the **same** navigation pattern (e.g. still `Scaffold` + bottom bar) |
| **Adaptive** | **Form factor / platform** | Phone uses `BottomNavigationBar`; wide tablet uses **`NavigationRail`** or a **persistent drawer**; iOS may prefer `CupertinoTabBar` |

**“Responsive” only** — column count changes, navigation type unchanged:

```dart
Widget build(BuildContext context) {
  final w = MediaQuery.sizeOf(context).width;
  final columns = w < 600 ? 2 : w < 900 ? 4 : 6;
  return GridView.count(
    crossAxisCount: columns,
    children: const [ /* ... */ ],
  );
}
```

**“Adaptive”** — **navigation block** changes:

```dart
Widget build(BuildContext context) {
  final w = MediaQuery.sizeOf(context).width;
  final useRail = w >= 800;
  if (useRail) {
    return Scaffold(
      body: Row(
        children: [
          NavigationRail(/* ... */),
          const Expanded(child: MainContent()),
        ],
      ),
    );
  }
  return Scaffold(
    body: const MainContent(),
    bottomNavigationBar: BottomNavigationBar(/* ... */),
  );
}
```

---

### `MediaQuery` — what can you read?

`MediaQuery.of(context)` (or helpers like `MediaQuery.sizeOf`) describes the widget’s **display context** — usually the **full window** unless wrapped in a custom `MediaQuery`.

```dart
@override
Widget build(BuildContext context) {
  final size = MediaQuery.sizeOf(context);
  final w = size.width;
  final h = size.height;
  final padding = MediaQuery.paddingOf(context); // Safe area (notch, status bar)
  final viewInsets = MediaQuery.viewInsetsOf(context); // Phần bàn phím che
  final dpr = MediaQuery.devicePixelRatioOf(context);

  return Text('${w.toInt()} x ${h.toInt()} @${dpr}x');
}
```

- **`padding`:** area **not** covered by notch/status — pad manually if not using `SafeArea`.
- **`viewInsets.bottom`:** grows when the **keyboard** opens — push Submit button or pad a `ListView` bottom.

---

### Breakpoints — named constants (easy to review / tweak)

```dart
class Breakpoints {
  static const double small = 400;
  static const double medium = 800;
}

Widget layoutForWidth(double w) {
  if (w < Breakpoints.small) return const CompactHome();
  if (w < Breakpoints.medium) return const MediumHome();
  return const WideHome();
}

// Trong build:
final w = MediaQuery.sizeOf(context).width;
return layoutForWidth(w);
```

---

### `LayoutBuilder` — why not the same as `MediaQuery`?

`LayoutBuilder` receives **`constraints`** from the **parent** — the **actual box** the widget lives in, **not** always full screen.

**Example:** 400dp-wide screen but a `Card` is only 200dp → `LayoutBuilder` inside the `Card` sees `maxWidth == 200`, while `MediaQuery` still reports 400.

```dart
LayoutBuilder(
  builder: (context, c) {
    if (c.maxWidth > 600) {
      return const Row(
        children: [
          Expanded(flex: 1, child: Poster()),
          Expanded(flex: 2, child: DetailText()),
        ],
      );
    }
    return const Column(
      children: [Poster(), DetailText()],
    );
  },
);
```

**When to use which?**

| Situation | Prefer |
|-----------|--------|
| Whole-screen layout (1 vs 2 columns) | `MediaQuery.sizeOf(context).width` is often enough |
| Layout **inside card, drawer, dialog** | **`LayoutBuilder`** |
| Portrait / landscape | **`OrientationBuilder`** or `MediaQuery.orientationOf` |

---

### `OrientationBuilder`

```dart
OrientationBuilder(
  builder: (context, orientation) {
    final isPortrait = orientation == Orientation.portrait;
    return isPortrait
        ? ListView(children: const [A(), B(), C()])
        : Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Expanded(child: A()),
              Expanded(child: B()),
              Expanded(child: C()),
            ],
          );
  },
);
```

---

### `SafeArea`

Wrap content to avoid notch, Dynamic Island, home indicator:

```dart
Scaffold(
  body: SafeArea(
    child: Column(
      children: [
        const SearchBar(),
        Expanded(child: MovieGrid()),
      ],
    ),
  ),
);
```

- Can disable one side: `SafeArea(top: false, child: ...)` if `AppBar` already handles the top.

---

### `Wrap` — chip example (genre slide)

`Row` does not wrap to the next line → **overflow**. `Wrap` **wraps** like flex-wrap in CSS.

```dart
Wrap(
  spacing: 8,
  runSpacing: 8,
  children: genres
      .map((g) => Chip(label: Text(g)))
      .toList(),
)
```

---

### Responsive `GridView`

```dart
final w = MediaQuery.sizeOf(context).width;
final cross = w < 600 ? 2 : w < 900 ? 3 : 4;

GridView.count(
  crossAxisCount: cross,
  childAspectRatio: 0.7,
  children: posters,
);
```

---

### `Expanded` / `Flexible` in `Row` / `Column`

```dart
Row(
  children: [
    Image.network(url, width: 100, height: 150, fit: BoxFit.cover),
    const SizedBox(width: 12),
    Expanded(
      child: Text(title, maxLines: 3, overflow: TextOverflow.ellipsis),
    ),
  ],
);
```

- **`Expanded`** = `Flexible` with `fit: FlexFit.tight` — takes remaining space.

---

### Best practices & testing

- Avoid hard-coding `width: 360` for the **whole app**; prefer **constraints + % + `Expanded`**.
- Test on **small phone + tablet emulator**; DevTools → **Layout Explorer** for overflow.

### Common exam pitfalls

- Using **`MediaQuery.width`** for layout **inside a narrow panel** (card, half-screen split) → wrong; use **`LayoutBuilder`**.
- Forgetting **`SafeArea`** → text/buttons under the **notch**.
- **`GridView` in `Column`** without `Expanded` → unbounded height (same family as `ListView` in `Column`).

### Self-check questions

1. Give a case where **`LayoutBuilder` is required** instead of `MediaQuery`.
2. How does `Wrap` differ from `Row`? Example: multi-line chips.
3. How does `MediaQuery.paddingOf` differ from `viewInsetsOf` when the keyboard opens?

---
## Module 7 — Form & Validation

### Quick summary

**Form** groups multiple fields; **`GlobalKey<FormState>`** to call `validate()` / `save()` / `reset()` once; **`TextFormField`** + **`validator`** (`null` = valid); **`AutovalidateMode`**; **`FocusNode`** + **`textInputAction`**; form inside **`SingleChildScrollView`**; after validate → **POST API** (Module 8).

---

### `TextField` vs `TextFormField`

| Widget | When |
|--------|------|
| **`TextField`** | Single field, custom errors / no collective validation |
| **`TextFormField`** | Inside **`Form`**, uses **`validator`**, **`onSaved`**, tied to `FormState` |

---

### Standard flow: `validate` → `save` → server

1. User taps **Submit** → `if (!_formKey.currentState!.validate()) return;`
2. If valid → `_formKey.currentState!.save();` — runs **`onSaved`** on each field into your model / variables.
3. Call API (async) — show loading, handle server errors (Module 8).

**Why `save()` after `validate()`?** — Only commit data to the object you send when every field is valid; avoid saving garbage strings.

---

### Full example: email + password + confirm + scroll + dismiss keyboard

```dart
class SignupPage extends StatefulWidget {
  const SignupPage({super.key});
  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _pass = TextEditingController();
  final _confirm = TextEditingController();

  final _emailFocus = FocusNode();
  final _passFocus = FocusNode();
  final _confirmFocus = FocusNode();

  bool _obscure = true;

  @override
  void dispose() {
    _email.dispose();
    _pass.dispose();
    _confirm.dispose();
    _emailFocus.dispose();
    _passFocus.dispose();
    _confirmFocus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Đăng ký')),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        child: Form(
          key: _formKey,
          autovalidateMode: AutovalidateMode.onUserInteraction,
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              TextFormField(
                controller: _email,
                focusNode: _emailFocus,
                keyboardType: TextInputType.emailAddress,
                textInputAction: TextInputAction.next,
                decoration: const InputDecoration(labelText: 'Email'),
                onFieldSubmitted: (_) =>
                    FocusScope.of(context).requestFocus(_passFocus),
                validator: (v) {
                  if (v == null || v.trim().isEmpty) return 'Bắt buộc';
                  if (!v.contains('@')) return 'Email không hợp lệ';
                  return null;
                },
              ),
              TextFormField(
                controller: _pass,
                focusNode: _passFocus,
                obscureText: _obscure,
                textInputAction: TextInputAction.next,
                decoration: InputDecoration(
                  labelText: 'Mật khẩu',
                  suffixIcon: IconButton(
                    icon: Icon(_obscure ? Icons.visibility : Icons.visibility_off),
                    onPressed: () => setState(() => _obscure = !_obscure),
                  ),
                ),
                onFieldSubmitted: (_) =>
                    FocusScope.of(context).requestFocus(_confirmFocus),
                validator: (v) {
                  if (v == null || v.length < 8) return 'Tối thiểu 8 ký tự';
                  if (!RegExp(r'[0-9]').hasMatch(v)) return 'Cần ít nhất 1 số';
                  return null;
                },
              ),
              TextFormField(
                controller: _confirm,
                focusNode: _confirmFocus,
                obscureText: _obscure,
                textInputAction: TextInputAction.done,
                decoration: const InputDecoration(labelText: 'Nhập lại mật khẩu'),
                onFieldSubmitted: (_) => FocusScope.of(context).unfocus(),
                validator: (v) {
                  if (v != _pass.text) return 'Không khớp';
                  return null;
                },
              ),
              const SizedBox(height: 24),
              FilledButton(
                onPressed: () {
                  if (!_formKey.currentState!.validate()) return;
                  _formKey.currentState!.save();
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Hợp lệ — gửi API ở Module 8')),
                  );
                },
                child: const Text('Đăng ký'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

---

### `validator` — rules

- Type: `String? Function(String? value)`.
- Return **`null`** → field **valid**.
- Return **`String`** → shown **under the field** as error text.

---

### `AutovalidateMode` — UX feel

| Value | Behavior | Example use |
|-------|----------|-------------|
| `disabled` | Validate only when `validate()` is called (often on submit) | Short form, clean first paint |
| `always` | May validate on every rebuild | Can “go red” immediately — rarely used |
| **`onUserInteraction`** | After user **touches** the field | Balance: no errors before typing |

---

### Async validation (email taken) — skeleton

```dart
bool _checking = false;
String? _emailServerError;

Future<void> _submit() async {
  if (!_formKey.currentState!.validate()) return;
  setState(() {
    _checking = true;
    _emailServerError = null;
  });
  final taken = await api.isEmailTaken(_email.text);
  if (!mounted) return;
  setState(() => _checking = false);
  if (taken) {
    setState(() => _emailServerError = 'Email đã được dùng');
    return;
  }
  // POST đăng ký...
}
```

- Show `_emailServerError` via `InputDecoration(errorText: _emailServerError)` or `SnackBar`.

---

### Common exam pitfalls

- Long **`Column`** + keyboard → overflow; wrap with **`ListView`** or **`SingleChildScrollView`**.
- Forgetting **`dispose`** on `TextEditingController` / `FocusNode`.
- Password match without `.trim()` on email if the spec requires normalizing whitespace.

### Self-check questions

1. What does `validator` returning `null` mean?
2. Why call `validate()` before `save()`?
3. What does wrapping the form in `GestureDetector` + `unfocus` achieve?
4. When do you need a `mounted` check after `await` in form submit?

---

## Module 8 — REST API & JSON

### Quick summary

**REST** = resource + HTTP method; **`http`** package; **`Uri.parse`**; **`jsonEncode`/`jsonDecode`**; **model `fromJson`**; **`FutureBuilder`** or `StatefulWidget` + `setState`; **service layer**; **Bearer token** (Module 10); **do not** call the network inside `build()`.

---

### HTTP & REST — “resource” example

| Method | Meaning | Example endpoint (fake) |
|--------|---------|-------------------------|
| **GET** | Read data (idempotent) | `GET /posts`, `GET /posts/1` |
| **POST** | Create / action with body | `POST /posts` JSON body |
| **PUT/PATCH** | Replace / update resource | `PATCH /posts/1` |
| **DELETE** | Delete | `DELETE /posts/1` |

**Status codes (common questions):**

| Code / range | Typical meaning |
|--------------|-----------------|
| **200** | OK — GET/PUT success |
| **201** | Created — POST created |
| **204** | No Content — delete success, no body |
| **400** | Bad Request — malformed JSON |
| **401** | Unauthorized — **not / wrong** auth |
| **403** | Forbidden — logged in but **not allowed** |
| **404** | Not Found |
| **422** | Unprocessable Entity — server validation (common in Laravel) |
| **500+** | Server error |

---

### GET + parse JSON `List` — full example

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<List<Post>> fetchPosts() async {
  final uri = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  final res = await http.get(uri);
  if (res.statusCode < 200 || res.statusCode >= 300) {
    throw Exception('HTTP ${res.statusCode}: ${res.body}');
  }
  final decoded = jsonDecode(res.body);
  if (decoded is! List) throw const FormatException('Expected JSON array');
  return decoded
      .map((e) => Post.fromJson(e as Map<String, dynamic>))
      .toList();
}
```

---

### Model `fromJson` — slightly safer example

```dart
class Post {
  Post({required this.id, required this.title});
  final int id;
  final String title;

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'] as int,
      title: json['title'] as String,
    );
  }

  Map<String, dynamic> toJson() => {'id': id, 'title': title};
}
```

- If the API sometimes returns **float** for `id`, you might use `(json['id'] as num).toInt()` — depends on the assignment.

---

### POST JSON + read error body

```dart
Future<void> createPost() async {
  final res = await http.post(
    Uri.parse('https://jsonplaceholder.typicode.com/posts'),
    headers: const {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    },
    body: jsonEncode({
      'title': 'foo',
      'body': 'bar',
      'userId': 1,
    }),
  );
  if (res.statusCode < 200 || res.statusCode >= 300) {
    throw Exception('Tạo thất bại: ${res.statusCode} ${res.body}');
  }
  final map = jsonDecode(res.body) as Map<String, dynamic>;
  // dùng map['id'] ...
}
```

---

### API call with **Bearer token** (Module 10)

```dart
final res = await http.get(
  Uri.parse('$baseUrl/me'),
  headers: {
    'Authorization': 'Bearer $accessToken',
    'Accept': 'application/json',
  },
);
if (res.statusCode == 401) {
  // refresh token hoặc đăng xuất
}
```

---

### `FutureBuilder` — pattern + **common mistake**

**Correct:** create the `Future` **once** (state field initialized in `initState` or `late final` on first use).

```dart
class PostsScreen extends StatefulWidget {
  const PostsScreen({super.key});
  @override
  State<PostsScreen> createState() => _PostsScreenState();
}

class _PostsScreenState extends State<PostsScreen> {
  late final Future<List<Post>> _future;

  @override
  void initState() {
    super.initState();
    _future = fetchPosts(); // chỉ 1 lần
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Post>>(
      future: _future,
      builder: (context, snapshot) {
        if (snapshot.connectionState != ConnectionState.done) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Lỗi: ${snapshot.error}'),
              TextButton(
                onPressed: () => setState(() => _future = fetchPosts()),
                child: const Text('Thử lại'),
              ),
            ],
          );
        }
        final posts = snapshot.data ?? [];
        if (posts.isEmpty) return const Center(child: Text('Trống'));
        return ListView.builder(
          itemCount: posts.length,
          itemBuilder: (_, i) => ListTile(title: Text(posts[i].title)),
        );
      },
    );
  }
}
```

**Wrong:** `future: fetchPosts()` **directly in `build()`** on every rebuild → repeated API calls.

---

### Service layer — injectable `Client` (mocking in tests)

```dart
class PostRepository {
  PostRepository({http.Client? client}) : _c = client ?? http.Client();
  final http.Client _c;

  Future<List<Post>> getPosts() async {
    final res = await _c.get(Uri.parse('https://jsonplaceholder.typicode.com/posts'));
    if (res.statusCode != 200) throw Exception('HTTP ${res.statusCode}');
    final list = jsonDecode(res.body) as List<dynamic>;
    return list.map((e) => Post.fromJson(e as Map<String, dynamic>)).toList();
  }
}
```

- Unit tests: pass a `MockClient` with a fixed body — no real network.

---

### Catching network errors

```dart
import 'dart:io';

try {
  await fetchPosts();
} on SocketException catch (e) {
  // không có mạng / DNS
} on HttpException catch (e) {
  // lỗi tầng HTTP
} on FormatException catch (e) {
  // JSON không đúng dạng
}
```

### Common exam pitfalls

- Calling APIs inside `build()`.
- Ignoring `statusCode` — body may be an HTML error page.
- Wrong `as Type` → **runtime cast error**.

### Self-check questions

1. Why should `future:` in `FutureBuilder` not create a new future on every `build()`?
2. How do **401** and **403** differ?
3. How does separating `Repository` from `Widget` help tests and maintenance?

---

## Module 9 — Local storage

### Quick summary

Three layers: **`SharedPreferences`** (key–value), **JSON files** (`path_provider` + `dart:io`), **SQLite via `sqflite`**; **offline-first** strategy; pick tooling by **size + structure + query needs**.

---

### Why local storage?

- **Offline:** open the app without network and still see cached data.
- **Speed:** disk read beats waiting on the API every time.
- **UX:** remember theme, token, filters, favorites.

---

### SharedPreferences — lifecycle example: load → toggle → save

```dart
import 'package:shared_preferences/shared_preferences.dart';

class SettingsRepo {
  static const _keyDark = 'isDarkMode';

  Future<bool> loadDarkMode() async {
    final p = await SharedPreferences.getInstance();
    return p.getBool(_keyDark) ?? false;
  }

  Future<void> saveDarkMode(bool value) async {
    final p = await SharedPreferences.getInstance();
    await p.setBool(_keyDark, value);
  }
}
```

- **Supported types:** `String`, `int`, `double`, `bool`, `List<String>`.
- **Complex objects:** `jsonEncode` → store as one `String` (or use a file / SQLite).

---

### `path_provider` — choosing a directory

| API | Typical use |
|-----|-------------|
| `getApplicationDocumentsDirectory()` | **User** files to keep long-term (notes, JSON cache) |
| `getTemporaryDirectory()` | Temp cache — OS may delete |

---

### JSON file — full read + write

```dart
import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';

Future<File> _notesFile() async {
  final dir = await getApplicationDocumentsDirectory();
  return File('${dir.path}/notes.json');
}

Future<List<Map<String, dynamic>>> loadNotes() async {
  final f = await _notesFile();
  if (!await f.exists()) return [];
  final raw = await f.readAsString();
  return (jsonDecode(raw) as List).cast<Map<String, dynamic>>();
}

Future<void> saveNotes(List<Map<String, dynamic>> data) async {
  final f = await _notesFile();
  await f.writeAsString(jsonEncode(data));
}
```

---

### SQLite + `sqflite` — minimal exam example

Add `sqflite` and `path` to `pubspec.yaml`.

```dart
import 'package:path/path.dart' as p;
import 'package:sqflite/sqflite.dart';

Future<Database> openTodosDb() async {
  final dbPath = await getDatabasesPath();
  final path = p.join(dbPath, 'todos.db');
  return openDatabase(
    path,
    version: 1,
    onCreate: (db, version) async {
      await db.execute('''
        CREATE TABLE todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          done INTEGER NOT NULL
        )
      ''');
    },
  );
}

Future<int> insertTodo(Database db, String title) {
  return db.insert('todos', {
    'title': title,
    'done': 0,
  }, conflictAlgorithm: ConflictAlgorithm.replace);
}

Future<List<Map<String, Object?>>> allTodos(Database db) {
  return db.query('todos', orderBy: 'id DESC');
}
```

- **`sqflite`** is a Flutter **bridge** to the **SQLite** engine — not “a different database”.
- **Web:** classic `sqflite` does not run like on mobile; use other solutions (IndexedDB, Drift, etc.).

---

### Offline-first — model

```text
1. Đọc DB / file local → hiển thị ngay (có thể “cũ”)
2. Nếu có mạng → gọi API lấy bản mới
3. Merge / ghi đè local
4. Nếu conflict → dùng timestamp / “last write wins” / hỏi user (tùy nghiệp vụ)
```

---

### Choosing a tool — decision table

| Need | Suggestion |
|------|------------|
| Small settings, flags | SharedPreferences |
| Medium lists, JSON export | File |
| Many tables, queries, indexes | SQLite (`sqflite`) |
| Long-term sync | SQLite + API/Firebase |

### Common exam pitfalls

- Storing real passwords in plain text in Prefs — real passwords are **hashed** on the server; sensitive tokens prefer **secure storage** if security is graded.
- Calling `getInstance()` on every button tap is usually fine (light async), but **batch** many `set` calls when possible.

### Self-check questions

1. When pick a JSON file over SharedPreferences?
2. How does `getApplicationDocumentsDirectory` differ from `getTemporaryDirectory`?
3. Write a simple `CREATE TABLE` and matching `insert` (pseudo-code).
4. What is offline-first?

---

## Module 10 — Authentication, sessions & notifications

### Quick summary

**Authentication** vs **Authorization**; **JWT** (header–payload–signature); **login/signup** + validation; **mock** vs **real API**; **session** stores token → **Splash** auto-login; **Firebase + Google Sign-In**; **local notification** after login; **HTTPS**, Bearer header, **do not** log tokens.

---

### Auth vs Authorization — everyday examples

| Concept | Question | Example |
|---------|----------|---------|
| **Authentication** | Who are you? | Email/password login → server returns token |
| **Authorization** | What may you do? | Token with `role: admin` required for `DELETE /users/1` |

---

### Token flow (slides + header example)

1. `POST /login` body `{ "email", "password" }`.
2. **200** + JSON `{ "accessToken": "...", "refreshToken": "..." }`.
3. App stores token (Prefs / secure storage).
4. **GET /profile** with headers:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Accept: application/json
```

5. Access expired → `POST /refresh` with refresh → new access.
6. **401** after refresh fails → clear session, go to Login.

---

### JWT — short explanation (no manual decoding needed on typical exams)

- String of **three** parts joined by `.`: **header.payload.signature** (Base64URL).
- **Signing** (HMAC/RSA) lets the server **verify** the token was not tampered with; **payload** (claims) can be **read** via Base64 decode — **not** “secret encryption”.
- Common claims: **`exp`** (expiry), **`sub`** (user id), **`email`**, **`role`**.

---

### Login UI — checklist + mock `AuthService` skeleton

```dart
class AuthService {
  Future<String?> login(String email, String password) async {
    await Future<void>.delayed(const Duration(seconds: 1));
    if (email == 'demo@test.com' && password == '123456') {
      return 'mock_jwt_${DateTime.now().millisecondsSinceEpoch}';
    }
    return null;
  }
}

// Trong widget:
bool _loading = false;
Future<void> _onLogin() async {
  if (!_formKey.currentState!.validate()) return;
  setState(() => _loading = true);
  final token = await auth.login(_email.text, _pass.text);
  if (!mounted) return;
  setState(() => _loading = false);
  if (token == null) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Sai tài khoản')),
    );
    return;
  }
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('auth_token', token);
  Navigator.of(context).pushReplacement(
    MaterialPageRoute<void>(builder: (_) => const HomePage()),
  );
}
```

---

### Mock vs real API

| | Mock | Real (DummyJSON, etc.) |
|---|------|-------------------------|
| Network | Not required | Required |
| Demo stability | High | Depends on server |
| Learning real HTTP | Limited | Full |

---

### Splash + auto-login — pseudo-code

```dart
class SplashScreen extends StatefulWidget {
  @override
  State<SplashScreen> createState() => _SplashState();
}

class _SplashState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _go();
  }

  Future<void> _go() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');
    if (!mounted) return;
    if (token != null) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute<void>(builder: (_) => const HomePage()),
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute<void>(builder: (_) => const LoginPage()),
      );
    }
  }

  @override
  Widget build(BuildContext context) =>
      const Scaffold(body: Center(child: CircularProgressIndicator()));
}
```

---

### Logout

```dart
Future<void> logout() async {
  final p = await SharedPreferences.getInstance();
  await p.remove('auth_token');
  // Navigator về Login + pushReplacementNamed('/login')
}
```

---

### Firebase + Google Sign-In — checklist (Android)

1. Create Firebase project, add Android app with correct **`applicationId`** (`android/app/build.gradle`).
2. Add **SHA-1 / SHA-256** (debug keystore) to Firebase.
3. Download **`google-services.json`** → `android/app/`.
4. **`android/build.gradle.kts` / `settings.gradle`:** classpath `com.google.gms:google-services` (per version docs).
5. **`android/app/build.gradle`:** `apply plugin: 'com.google.gms.google-services'`.
6. **`pubspec.yaml`:** `firebase_core`, `firebase_auth`, `google_sign_in`.
7. Firebase console: enable **Google** sign-in provider.

**Common errors:** missing SHA-1 → cannot pick account; wrong package name; emulator without Play Services.

---

### Local notifications (idea)

- After successful login: call a notification service (`flutter_local_notifications`) — **separate** from `AuthService` for easier testing.

---

### Security (grading points)

- Always **HTTPS**; do not `print(token)` in production logs.
- Passwords **hashed on server**; **refresh token** stored more safely than access if the exam goes deep.

### Common exam pitfalls

- Confusing **JWT signed** with “payload nobody can read”.
- Storing tokens without handling **401** / expiry.

### Self-check questions

1. How do access and refresh tokens differ in role?
2. Write **one** HTTP header line sending a Bearer token.
3. Why use `pushReplacement` after login?
4. List four Android setup steps for Google Sign-In (per slides).

---

## Module 11 — Testing & debugging

### Quick summary

**Pyramid:** many **unit**, some **widget**, few **integration**; `flutter_test`: **`test`**, **`testWidgets`**, **`pump` / `pumpAndSettle`**, **`find`**, **`expect`**; **arrange–act–assert**; DevTools (Inspector, Performance, Memory).

---

### Three test kinds — detailed comparison

| Kind | Goal | Runs where | Example |
|------|------|------------|---------|
| **Unit** | Pure functions, models, repository (mock HTTP) | Dev machine, no emulator | `expect(task.completed, true)` after `toggle()` |
| **Widget** | Render + interaction (tap, enter text) | Test engine (`flutter test`) | Find `TextField`, tap Add, `expect` text appears |
| **Integration** | End-to-end on device / driver | **integration_test** + emulator or device | Open app → login → screen X |

**Why more unit than integration?** — Unit/widget are **fast and stable**; integration is **slow and brittle** (network, timing), so reserve it for **critical flows**.

---

### Unit test — full example

```dart
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('Task.toggle đổi completed', () {
    final task = Task(title: 'Học Flutter', completed: false);
    task.toggle();
    expect(task.completed, isTrue);
    task.toggle();
    expect(task.completed, isFalse);
  });
}
```

**AAA (Arrange – Act – Assert):**

- **Arrange:** create initial `Task`.
- **Act:** call `toggle()`.
- **Assert:** `expect` the right state.

---

### Widget test — full example

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Nhập task và bấm Add hiển thị trong list', (tester) async {
    await tester.pumpWidget(
      const MaterialApp(home: TaskListScreen()),
    );

    await tester.enterText(find.byType(TextField), 'Mua sữa');
    await tester.tap(find.text('Add'));
    await tester.pump(); // rebuild sau setState

    expect(find.text('Mua sữa'), findsOneWidget);
  });
}
```

**Common `find` matchers:**

| Matcher | When |
|---------|------|
| `find.text('A')` | Find `Text` with exact string |
| `find.byType(TextField)` | Find widget type |
| `find.byKey(const Key('save'))` | Stable when many similar buttons |

---

### `pump` vs `pumpAndSettle`

| API | Effect |
|-----|--------|
| **`pump()`** | One frame / immediate microtasks — after `tap`/`enterText` |
| **`pumpAndSettle()`** | Pump until **no** pending animations/timers — with **Animation**, long **FutureBuilder** |

```dart
await tester.tap(find.text('Next'));
await tester.pumpAndSettle(); // chờ transition sang màn mới
expect(find.text('Chi tiết'), findsOneWidget);
```

---

### Navigation test (idea)

```dart
await tester.tap(find.text('Mở chi tiết'));
await tester.pumpAndSettle();
expect(find.byType(DetailScreen), findsOneWidget);
```

---

### Mock repository (idea)

```dart
class FakeTaskRepo implements TaskRepository {
  @override
  Future<List<Task>> load() async => [Task(title: 'A', completed: false)];
}
```

- Inject into widget via constructor or `Provider` — tests **do not** hit real APIs.

---

### DevTools — debugging a running app

| Tool | Use |
|------|-----|
| **Widget Inspector** | Widget tree, constraints, overflow |
| **Performance** | Frame timeline, jank |
| **Memory** | Suspected leaks / huge retained graphs |

---

### Best practices

- One `test` / `testWidgets` = **one clear behavior**.
- Add **`Key`** to hard-to-find widgets.
- Do not assert Flutter **implementation** internals (e.g. `RenderObject` counts).

### Common exam pitfalls

- Forgetting **`pump`** after `tap` → `expect` runs before rebuild.
- Confusing **widget tests** with **integration** — integration needs `integration_test` + driver.

### Self-check questions

1. Why does the pyramid favor many unit tests over integration?
2. When do `pump` and `pumpAndSettle` differ?
3. Write a minimal `testWidgets`: `pumpWidget` → `tap` → `expect`.

---

## Module 12 — Performance & deployment

### Quick summary

**Widgets are immutable** → keep `build()` light; **`const`**, **split widgets**, **`ListView.builder`**, **`ValueKey`**, **Provider `Selector`**; **images** resize/cache; **DevTools Profile**; **APK/AAB**; **`versionCode` / `versionName`**; app signing (Play).

---

### Three build modes — command examples

| Mode | Command / how | Notes |
|------|---------------|--------|
| **Debug** | `flutter run` | Assertions, hot reload, **slower** than release |
| **Profile** | `flutter run --profile` | Near release, **DevTools** CPU/GPU timeline |
| **Release** | `flutter run --release` / `flutter build apk` | Optimized, **no** hot reload |

**FPS / jank:** measure in **Profile** or **Release** — **not** from Debug alone.

---

### Render pipeline — one exam sentence

```text
Widget (cấu hình) → Element (vị trí + state) → RenderObject (layout + paint)
```

- `build()` only **describes** new widgets; the framework **diffs** and updates minimally.
- **Heavy** work in `build()` (sorting 10⁶ items, `http.get`, decoding huge images) → **dropped frames**.

---

### Example of what **not** to do in `build()`

```dart
// ❌ Anti-pattern
@override
Widget build(BuildContext context) {
  final sorted = List.of(items)..sort(); // mỗi frame sort lại
  http.get(Uri.parse('https://...'));     // gọi mạng mỗi frame
  return ListView(children: sorted.map((e) => Text('$e')).toList());
}
```

**Fix:** sort **once** when data changes (`initState` / after `await` / `setState`); HTTP in a repository called from `initState` or a refresh button.

---

### Optimization checklist (with short examples)

1. **`const Text('X')`** — avoid new objects every frame when possible.
2. **Extract `TaskTile`** — when `notifyListeners` / `setState` changes one item, the parent list need not rebuild everything if split well.
3. **`ListView.builder`** — only builds items **in the viewport**.

```dart
ListView.builder(
  itemCount: tasks.length,
  itemBuilder: (context, i) => TaskTile(
    key: ValueKey(tasks[i].id),
    task: tasks[i],
  ),
);
```

4. **`ValueKey(id)`** — helps framework identify items on reorder.
5. **`Selector`** — rebuild only when `count` changes, not other model fields.
6. **Images:**

```dart
Image.network(
  url,
  width: 120,
  height: 180,
  fit: BoxFit.cover,
  errorBuilder: (_, __, ___) => const Icon(Icons.broken_image),
);
```

---

### Size analysis

```bash
flutter build apk --release --analyze-size
```

- Inspect treemap: **Dart AOT**, **native .so**, **assets** — remove unused assets / dependencies.

---

### Release build — commands & outputs

```bash
flutter build apk --release
# → build/app/outputs/flutter-apk/app-release.apk

flutter build appbundle --release
# → build/app/outputs/bundle/release/app-release.aab  (Play Store)
```

**Android versioning** (`android/app/build.gradle` or `.kts`):

```gradle
defaultConfig {
    versionCode 12        // số nguyên tăng mỗi lần upload Play
    versionName "1.2.0"   // hiển thị cho user
}
```

---

### App signing (exam concepts)

- Create a **keystore** → `key.properties` → Gradle **signingConfigs** for `release`.
- Play App Signing: Google may hold the app key — you submit an **AAB** signed with the upload key.

---

### Common exam pitfalls

- Benchmarking on **Debug**.
- `UniqueKey()` for every list item build → Flutter treats **every item as new** → scroll state lost.
- `watch` at app root → massive rebuilds.

### Self-check questions

1. List **four** things you should not do in `build()`.
2. Why does **Profile** measure jank more reliably than **Debug**?
3. **APK** vs **AAB** for Play Store?
4. How do `versionCode` and `versionName` differ?

---

## Common exam comparisons & viva

The table below is a **quick-answer target**; details + examples live in Modules 6–12 above.

| Pair | Short distinction |
|------|-------------------|
| `Stateless` vs `Stateful` | Internal state + `setState` or not |
| `final` vs `const` | Runtime constant vs compile-time constant |
| `extends` vs `implements` | Inherit implementation or not |
| `ListView` vs `ListView.builder` | Builder is lazy — better for long lists |
| `watch` vs `read` (Provider) | Listen/rebuild vs one-off read |
| MediaQuery vs LayoutBuilder | Screen size vs parent constraints |
| Responsive vs Adaptive | By **width** vs by **device type** (rail vs bottom bar) |
| `TextField` vs `TextFormField` | Form-wide validation + `validator` |
| GET vs POST | Read data vs create/submit |
| SharedPreferences vs SQLite | Simple key-value vs relational/query |
| Auth vs Authorization | Who you are vs what you may do |
| Hot Reload vs Hot Restart | Keep state when possible vs reset state |
| Debug vs Profile vs Release | Dev / perf measurement / production |
| JWT signed vs “encrypted” | Signature prevents tampering; payload still readable without extra encryption |
| `pump` vs `pumpAndSettle` (test) | One frame vs wait for animations/async to settle |

---

## Quick reference tables

| Topic | One-liner |
|-------|-----------|
| Architecture | Framework (Dart) / Engine (C++) / Embedder |
| UI | Everything is a widget; composition over inheritance |
| State | `setState`, `InheritedWidget`, `Provider` |
| Nav | Stack; `push`/`pop`; named routes; deep link native config |
| Layout | Constraints; `Expanded`; scroll vs unbounded height |
| Responsive | `MediaQuery`, `LayoutBuilder`, breakpoints |
| Form | `Form` + `GlobalKey<FormState>` + `validator` returns `null` = OK |
| API | `http` + `jsonDecode` + model + `FutureBuilder` + service |
| Storage | Prefs / JSON file / sqflite by complexity |
| Auth | JWT + Bearer header + session storage + Splash |
| Test | Many unit — some widget — few integration |
| Perf | `const`, split widgets, no heavy `build`, list `builder` |
| Ship | `versionCode++`, AAB for Play, test Profile first |

---

## Exam prep suggestions (1-2 day plan)

1. **Theory 30 min:** read “Common exam comparisons” and **explain each row aloud** with your own example (no peeking).
2. **Practice 2 h:** one screen **Form validation** → **POST** JSON → **FutureBuilder** list → **save token** SharedPreferences → **Splash** chooses Login/Home.
3. **Practice 1 h:** `ListView.builder` + **navigate** to detail with **args** + `pop` returns `result`.
4. **Responsive 45 min:** one screen with **`MediaQuery` breakpoint** + **`LayoutBuilder`** inside a card (two different layouts).
5. **Perf 30 min:** list **six** techniques from Module 12 + **one** `build()` anti-pattern snippet.
6. **Tests 30 min:** write a `testWidgets` skeleton: `pumpWidget` → `enterText` → `tap` → `pump` → `expect`.

---

*Compiled from Module 1–12 slides; sample code is normalized for review — may differ slightly from your instructor’s template. If the exam requires a specific API (Riverpod, go_router, etc.), add it per your course materials.*
