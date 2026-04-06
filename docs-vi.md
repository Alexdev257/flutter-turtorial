# Ôn tập Flutter — Tổng hợp chi tiết (Module 1–12)

Tài liệu tổng hợp từ slide khóa học, **bổ sung cấu trúc ôn thi**: ví dụ code ngắn, điểm dễ nhầm, câu hỏi tự kiểm tra. Nên đọc kèm [docs.flutter.dev](https://docs.flutter.dev) và [dart.dev](https://dart.dev).

---

## Cách dùng tài liệu này

1. Đọc lướt **“Tóm tắt nhanh”** đầu mỗi module để nắm khung.
2. Học kỹ phần **chi tiết + ví dụ** — đây là dạng hay áp dụng trong bài thi / bài tập lớn.
3. Làm **câu hỏi tự kiểm tra** — trả lời được bằng lời mới coi là nắm.
4. Cuối file có **lệnh CLI**, **bảng HTTP**, **so sánh hay ra đề**.

---

## Mục lục

1. [Lệnh & chế độ chạy Flutter (ôn chung)](#lệnh--chế-độ-chạy-flutter-ôn-chung)
2. [Module 1 — Giới thiệu Flutter](#module-1--giới-thiệu-flutter)
3. [Module 2 — Dart cơ bản](#module-2--dart-cơ-bản)
4. [Module 3 — Dart nâng cao](#module-3--dart-nâng-cao)
5. [Module 4 — UI & Widget cơ bản](#module-4--ui--widget-cơ-bản)
6. [Module 5 — Điều hướng & quản lý state](#module-5--điều-hướng--quản-lý-state)
7. [Module 6 — Responsive & Adaptive](#module-6--responsive--adaptive)
8. [Module 7 — Form & Validation](#module-7--form--validation)
9. [Module 8 — REST API & JSON](#module-8--rest-api--json)
10. [Module 9 — Lưu trữ cục bộ](#module-9--lưu-trữ-cục-bộ)
11. [Module 10 — Xác thực, phiên & thông báo](#module-10--xác-thực-phiên--thông-báo)
12. [Module 11 — Kiểm thử & gỡ lỗi](#module-11--kiểm-thử--gỡ-lỗi)
13. [Module 12 — Hiệu năng & triển khai](#module-12--hiệu-năng--triển-khai)
14. [So sánh hay gặp trong đề / vấn đáp](#so-sánh-hay-gặp-trong-đề--vấn-đáp)
15. [Bảng tra cứu nhanh](#bảng-tra-cứu-nhanh)

---

## Lệnh & chế độ chạy Flutter (ôn chung)

| Lệnh / chế độ | Ý nghĩa |
|---------------|---------|
| `flutter doctor` | Kiểm tra SDK, Android toolchain, VS Code/Android Studio, thiết bị |
| `flutter pub get` | Tải dependency theo `pubspec.yaml` |
| `flutter run` | Chạy app (mặc định **Debug** — có Hot Reload, overhead lớn) |
| `flutter run --profile` | Đo hiệu năng gần release, bật DevTools Performance đúng nghĩa |
| `flutter run --release` | Bản tối ưu, không Hot Reload |
| `flutter build apk --release` | APK cài tay máy / chia sẻ nội bộ |
| `flutter build appbundle --release` | **AAB** — Google Play |
| `flutter build apk --analyze-size` | Phân tích kích thước (kèm báo cáo) |

**Hot Reload vs Hot Restart**

- **Hot Reload:** inject code/state giữ lại khi có thể — nhanh, phù hợp sửa UI.
- **Hot Restart:** khởi động lại isolate Dart — state mất; cần khi đổi `main()`, `initState` logic lớn, hoặc reload không “ăn”.

---

## Module 1 — Giới thiệu Flutter

### Tóm tắt nhanh

Flutter = UI toolkit, một codebase → nhiều platform; engine Skia; kiến trúc 3 lớp; Dart có AOT/JIT và null safety.

### Flutter là gì?

- **UI toolkit** của Google, build app **biên dịch native** từ **một codebase**.
- Hỗ trợ Android, iOS, Web, macOS, Linux, Windows.
- Viết bằng **Dart**; **không** dùng widget native để vẽ UI (khác React Native bridge view).
- Render qua engine **Skia** (ổn định pixel giữa các máy).

### Vì sao dùng Flutter?

| Đặc điểm | Mô tả |
|----------|--------|
| Phát triển nhanh | Hot Reload / Hot Restart |
| UI đẹp | Material & Cupertino |
| Một codebase | Viết một lần, triển khai nhiều nền tảng |
| Hiệu năng | Gần native (AOT trên mobile release) |

### Khi nào Flutter phù hợp?

- App **đa nền tảng**, UI + logic dùng chung.
- **MVP**, startup, prototype nhanh.
- Ứng dụng doanh nghiệp: e-commerce, booking, dashboard.
- Ít phụ thuộc API phần cứng/OS cực sâu; team không đủ dev Android + iOS riêng.

### Khi nào native / công nghệ khác hợp lý hơn?

- Tùy biến OS rất sâu; **game / đồ họa real-time** cao; truy cập phần cứng mức thấp; UI/UX bắt buộc theo guideline từng platform từng pixel.

### Tích hợp native (Platform Channels)

- Flutter đảm nhiệm **UI + business logic**; phần **đặc thù platform** (camera, Bluetooth, NFC, SDK thanh toán…) có thể viết **Kotlin/Java** hoặc **Swift/Obj-C** và gọi qua **MethodChannel / EventChannel**.
- Thực tế: Flutter **không thay thế hoàn toàn** native — **kết hợp** là mô hình phổ biến.

### Lịch sử (slide — nắm ý)

Sky (2015) → Alpha (2017) → 1.0 (2018) → 2.0 Web/Desktop (2021) → Flutter 3.x ổn định (2023–2025).

### Kiến trúc 3 lớp

1. **Framework (Dart):** Widget (`Stateless`/`Stateful`), rendering, layout, foundation. **Mọi thứ là Widget.**
2. **Engine (C++):** Skia, text layout, accessibility, đồng bộ frame, GPU.
3. **Embedder:** Gắn engine vào từng OS — input, lifecycle cửa sổ, thread.

**Pipeline tóm tắt:** `Widget Tree` → `Element` + `RenderObject` (layout/paint) → compositing → GPU.

### So sánh nhanh với RN / Native

| | Ngôn ngữ | Cách vẽ UI |
|---|----------|------------|
| Flutter | Dart | Engine Flutter + Skia |
| React Native | JS/TS | Bridge tới view native |
| Native | Kotlin/Swift | View hệ thống |

### Dart trong Flutter

- Thiết kế cho client/UI: **tree shaking**, **sound null safety**.
- **JIT** (dev) + **AOT** (release mobile) — dev nhanh, release hiệu năng.

### Môi trường phát triển

| Công cụ | Đặc điểm |
|---------|----------|
| [DartPad](https://dartpad.dev) | Không cài; demo widget cơ bản; **không** plugin native |
| VS Code | Nhẹ; Flutter/Dart extension; `Flutter: New Project` |
| Android Studio | IDE đầy đủ; SDK; emulator; plugin Flutter |

**Cài đặt SDK:** tải từ [flutter.dev](https://flutter.dev), giải nén, thêm `bin` vào **PATH**, chạy `flutter doctor` và xử lý từng dấu ✓/✗.

### Cấu trúc project

| Đường dẫn | Vai trò |
|-----------|---------|
| `lib/main.dart` | `runApp()` — điểm vào |
| `pubspec.yaml` | Dependencies, assets, fonts |
| `android/`, `ios/`, `web/`, … | Mã native / cấu hình từng platform |
| `test/` | Unit & widget test |

### Emulator (gợi ý slide)

- Android Studio → Device Manager → tạo AVD (ví dụ Pixel), API 33+ cho máy đủ mạnh; máy yếu: Pixel 3a / API 30, storage ~4GB.

### Dễ nhầm khi thi

- Nhầm **Flutter “compile native”** với **dùng widget UI native** — Flutter tự vẽ, không phải 100% view XML/Storyboard cho phần UI Flutter.
- **Hot Reload** không luôn cập nhật mọi thay đổi (global state, một số thay đổi `main`).

### Câu hỏi tự kiểm tra

1. Kể tên 3 lớp kiến trúc Flutter và vai trò từng lớp.
2. Khi nào nên cân nhắc code native thêm vào project Flutter?
3. `flutter doctor` dùng để làm gì?

---

## Module 2 — Dart cơ bản

### Tóm tắt nhanh

`main()`, **ôn kiểu có hệ thống** (số, tập hợp, `Object`/`dynamic`/`void`/`Never`), `final`/`const`/`late`, **chuỗi & interpolation** (kể cả raw/multiline), vòng lặp (**so sánh `for` / `for-in` / `forEach` / `while`**), OOP, null safety, collection functional, exception, `Future`/`async`/`await`, **Stream** (single vs broadcast, `listen`, `await for`).

### Chương trình

```dart
void main() {
  print('Hello Dart');
}
```

- Mọi thứ nằm trong **library**; file `dart` có thể có `import`.

### Kiểu dữ liệu (ôn hệ thống)

Trong Dart, **mọi giá trị đều là object** (kể cả `int`, `bool`), nhưng khi ôn thi bạn có thể nhóm kiểu theo **cách dùng** như sau.

#### 1. Số và logic

| Kiểu | Phạm vi / đặc điểm | Ví dụ |
|------|---------------------|--------|
| `int` | Số nguyên; kích thước phụ thuộc platform (thường 64-bit) | `-1`, `42`, `0xFF` |
| `double` | Số thực IEEE 754; **không** có kiểu `float` riêng | `3.14`, `1.2e3` |
| `bool` | Chỉ hai giá trị `true` / `false` — **không** dùng `0`/`1` như C | `if (ok) ...` |

#### 2. Chuỗi `String`

- Chuỗi **bất biến** (immutable): thao tác “sửa” thực chất tạo `String` mới.
- Nội bộ lưu dạng **UTF-16** (code units); ký tự đặc biệt vẫn dùng được, nhưng đếm `length` là đếm **code unit**, không phải luôn bằng “số chữ cái” trong mọi ngôn ngữ (ôn nâng cao Unicode nếu môn học yêu cầu).

#### 3. Tập hợp (đều có thể dùng **generic** `List<T>`, `Set<T>`, `Map<K,V>`)

| Kiểu | Đặc điểm | Ghi chú ôn thi |
|------|-----------|----------------|
| `List` | Có thứ tự, cho phép trùng | `[]`, `[1, 2]` |
| `Set` | Không trùng, thứ tự không đảm bảo như “danh sách cố định” | `{1, 2}`, `{1, 1, 2}` → `{1, 2}` |
| `Map` | Cặp key → value; key duy nhất | `{'id': 1}` |
| `Iterable<T>` | Kiểu trừu tượng cho “có thể duyệt được” | `List`, `Set`, `map()`/`where()` trả về lazy iterable |

#### 4. `enum`

```dart
enum Status { pending, done, error }
```

- So sánh bằng `==` giữa các giá trị cùng enum; Dart 3 có **enhanced enum** (thêm field/method) nếu giảng viên đã dạy.

#### 5. Kiểu đặc biệt (hay hỏi lý thuyết)

| Kiểu | Ý nghĩa | Ghi chú |
|------|---------|---------|
| `Object` | Tổ tiên của (gần như) mọi kiểu | Mọi giá trị đều là `Object` |
| `dynamic` | **Tắt kiểm tra kiểu tĩnh** — gọi method/property bất kỳ, lỗi chỉ lộ lúc chạy | Tránh lạm dụng; chỉ khi thật cần (JSON thô, interop) |
| `void` | “Không có giá trị trả về có ý nghĩa” — dùng cho **side effect** | `void main()` |
| `Null` | Chỉ có một giá trị `null` | Với null safety, thường gặp trong `Null` type / `T?` |
| **`Never`** | **Kiểu đáy (bottom): không tồn tại giá trị hợp lệ** | Dùng cho hàm **không bao giờ return bình thường** — xem mục dưới |

---

### Biến: `var`, `final`, `const`

```dart
var name = 'FPT'; // suy luận String
final year = DateTime.now().year; // gán 1 lần, giá trị runtime
const pi = 3.14; // hằng compile-time
```

- **`late`** (ôn thêm): khai báo biến non-nullable nhưng gán sau; dùng khi khởi tạo phụ thuộc `initState` hoặc vòng đời (Flutter hay gặp).
- **`const` widget** trong Flutter giúp framework bỏ qua rebuild khi tham số không đổi (xem Module 12).

---

### Kiểu `Never` — nói rõ cho ôn thi

`Never` **không phải** “một ô nhớ đặc biệt” như `var`, mà là **kiểu trả về** (hoặc kiểu biểu thức) mang ý nghĩa: **luồng thực thi không thể kết thúc bình thường với một giá trị**.

| So sánh | `void` | `Never` |
|---------|--------|---------|
| Hàm “không trả về giá trị cho caller” | Có — thường chỉ chạy xong hoặc `return;` | Không — **không** có đường return “bình thường” |
| Ví dụ điển hình | `void log(String m) { print(m); }` | Hàm **luôn ném lỗi**, hoặc vòng lặp vô hạn, hoặc `exit` |

```dart
Never fail(String msg) {
  throw Exception(msg); // không có return bình thường
}

// Hàm kiểu Never thường dùng để "chấm dứt" luồng: throw / không bao giờ return
```

- Trình biên dịch dùng `Never` để **suy luận kiểu an toàn** (ví dụ: sau khi gọi `fail()`, code phía dưới có thể được coi là **unreachable** trong một số phân tích).
- **Không nhầm** với `void`: `void f()` vẫn **chạy xong và trả về** (không có dữ liệu); `Never g()` **không** có kết thúc thành công.

---

### Chuỗi & interpolation (nói rõ)

#### Dấu nháy và chuỗi nhiều dòng

- Một chuỗi có thể dùng **nháy đơn** `'...'` hoặc **nháy kép** `"..."` — tương đương về chức năng cơ bản.
- **Chuỗi nhiều dòng** dùng ba dấu nháy:

```dart
final sql = '''
SELECT *
FROM users
WHERE id = ?
''';
```

#### Nội suy (interpolation)

- **`$tênBiến`**: chèn giá trị của biến / getter đơn giản (tên hợp lệ theo lexer).
- **`${biểu_thức}`**: chèn kết quả **bất kỳ biểu thức** nào — bắt buộc khi nối thuộc tính, gọi hàm, hoặc biểu thức không phải tên đơn.

```dart
final name = 'Nam';
final s1 = 'Xin chao $name';           // → Xin chao Nam
final s2 = 'Do dai: ${name.length}';   // bắt buộc có {}
final s3 = 'Tong: ${2 + 3}';           // → Tong: 5
```

- Muốn in **ký tự `$`** mà không bị hiểu là bắt đầu nội suy, thường dùng **`\\$`** trong chuỗi thường, hoặc ghép chuỗi / dùng `String.fromCharCode(36)` — chi tiết theo [Dart: Strings](https://dart.dev/guides/language/language-tour#strings).

#### Chuỗi raw `r'...'`

- Tiền tố `r` khiến **chuỗi escape** (`\n`, `\t`, `\\`, …) **không** được xử lý — thường dùng cho **regex** hoặc đường dẫn Windows có nhiều `\`.
- **Nội suy** `$name` / `${...}` **vẫn hoạt động** trong raw string (giống chuỗi thường); raw chỉ “tắt” ý nghĩa của **`\`**, không tắt cơ chế `$`.

```dart
final path = r'C:\Users\name\file.txt'; // giữ nguyên dấu \ trong file path
```

#### Một vài thao tác `String` hay gặp

| API | Tác dụng |
|-----|----------|
| `length` | Độ dài (code units) |
| `isEmpty` / `isNotEmpty` | Kiểm tra nhanh |
| `substring(start, [end])` | Cắt chuỗi |
| `split(pattern)` | Tách thành `List<String>` |
| `trim()` | Bỏ khoảng trắng đầu/cuối |
| `contains`, `startsWith`, `endsWith` | Tìm kiếm đơn giản |
| `toUpperCase()` / `toLowerCase()` | Đổi hoa thường |

---

### Toán tử (ôn nhanh)

- Số học: `+ - * / %`; chia nguyên dùng `~/`.
- So sánh: `== != < > <= >=`.
- Logic: `&& || !`.
- Null: `?.`, `??`, `!`, `??=`.

### Điều khiển: `if` / `else` / `switch`

- `if (điều_kiện) { } else { }` — điều kiện phải là biểu thức kiểu `bool` (không tự ép số như C).
- `switch (x) { case a: ...; break; default: ... }` — nhớ **`break`** (hoặc `continue`, `return`, `throw`) để không “rơi” sang case sau nếu không chủ ý.
- Dart 3 có **pattern matching** trong `switch` (nếu giảng viên đã dạy); không thì ôn dạng cổ điển ở trên là đủ.

### Vòng lặp — so sánh kỹ (ôn thi)

#### Bảng tổng quan

| Cách viết | Cú pháp gợi ý | Điểm mạnh | Hạn chế / lưu ý |
|-----------|----------------|-----------|------------------|
| **`for` cổ điển** | `for (var i = 0; i < n; i++) { }` | Kiểm soát **chỉ số**, bước nhảy (`i += 2`), điều kiện phức tạp | Dài dòng hơn khi chỉ cần duyệt hết phần tử |
| **`for-in`** | `for (final x in list) { }` | Ngắn, đọc dễ — duyệt mọi thứ **Iterable** | Không có chỉ số sẵn (cần thì dùng `asMap()` hoặc vòng `for` cổ điển) |
| **`while`** | `while (điều_kiện) { }` | Số lần lặp **không cố định** trước (đọc file, chờ điều kiện) | Dễ quên cập nhật biến → vòng lặp vô hạn |
| **`do-while`** | `do { } while (điều_kiện);` | **Luôn chạy ít nhất 1 lần** rồi mới kiểm tra | Ít dùng hơn `while` trong code UI thông thường |
| **`forEach`** | `list.forEach((e) { ... });` | Viết theo kiểu hàm, gọn khi chỉ **side effect** | **`return` trong closure chỉ thoát `forEach`**, không thoát hàm ngoài; **không** `break`/`continue` nhãn như `for` truyền thống một cách tự nhiên |

#### `for-in` vs `forEach`

- **`for-in`** là **cú pháp vòng lặp** — dùng `break`, `continue`, `await` (trong `async` function) trực quan.
- **`forEach`** nhận một **hàm callback** — `return` chỉ kết thúc **một lần gọi callback**, không “return” khỏi hàm chứa `forEach` (trừ khi bạn cố ý dùng nhãn hoặc refactor).

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

#### Khi nào dùng gì?

- Cần **index** (`0..length-1`) → `for` cổ điển hoặc `for (var i = 0; i < list.length; i++)`.
- Chỉ cần **duyệt hết phần tử** → **`for-in`** (ưu tiên đọc sạch).
- Cần **lazy** / functional chain → `map`, `where` (nhớ lazy — xem mục Collection).
- Lặp **không biết trước số vòng** → `while` / `do-while`.

### Hàm

```dart
int add(int a, int b) => a + b;

void greet({String name = 'Guest'}) => print(name);
```

- Tham số **optional positional** `[Type? x]`; **named** `{required String name}` hoặc có default.

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

- Kiểu `String` **không** chứa `null`; kiểu `String?` có thể null.
- `value?.length` — short-circuit nếu null.
- `name ?? 'Unknown'` — giá trị thay thế.
- `name!` — ép non-null (**chỉ** khi chắc chắn; sai sẽ crash runtime).

### Collection: `map`, `where`, `fold`

```dart
final nums = [1, 2, 3];
final doubled = nums.map((e) => e * 2).toList();
final evens = nums.where((e) => e.isEven);
```

- `map`/`where` trên `Iterable` là **lazy** đến khi gọi `toList()`, `for-in`, v.v.

### Exception

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

- **`async`** hàm luôn bọc return trong `Future` (trừ `void async` — cẩn thận lỗi unawaited).

### Stream — nói rõ hơn

#### `Future` vs `Stream`

| | `Future<T>` | `Stream<T>` |
|---|-------------|-------------|
| Số giá trị | **Một** giá trị (hoặc lỗi) trong tương lai | **Không** hoặc **nhiều** giá trị theo thời gian |
| Dùng khi | Một request HTTP, một lần đọc DB | Socket, log, vị trí GPS, đồng hồ, `StreamBuilder` |

#### Hai loại stream (rất hay hỏi)

1. **Single-subscription (mặc định)**  
   - Chỉ cho phép **một** listener lắng nghe tuần tự.  
   - Lắng nghe lần hai thường gây lỗi (stream đã được “đọc” hoặc không cho phép).

2. **Broadcast**  
   - **Nhiều** listener cùng lúc (ví dụ nhiều widget cùng subscribe).  
   - Tạo bằng `StreamController.broadcast()` hoặc các stream được thiết kế broadcast.

#### Tạo stream thường gặp

- **Generator bất đồng bộ** `async*` + `yield` — mỗi `yield` đẩy một sự kiện ra:

```dart
Stream<int> countDown() async* {
  for (var i = 3; i >= 1; i--) {
    await Future<void>.delayed(const Duration(seconds: 1));
    yield i;
  }
}
```

- **Stream đồng bộ từ iterable:** `Stream.fromIterable([1, 2, 3])`.
- **Periodic:** `Stream.periodic(Duration(seconds: 1), (i) => i)` — đồng hồ, tick.

#### Lắng nghe: `listen` vs `await for`

- **`stream.listen(...)`** — đăng ký callback, trả về `StreamSubscription` (có thể **`cancel()`** để hủy).

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

- **`await for (final x in stream)`** — chỉ dùng trong hàm **`async`**; đọc tuần tự từng phần tử cho đến khi stream đóng (thích hợp code “tuyến tính”).

```dart
Future<void> printAll(Stream<int> s) async {
  await for (final x in s) {
    print(x);
  }
}
```

#### `StreamController` (tự phát sự kiện)

```dart
final c = StreamController<int>();
c.stream.listen(print);
c.add(1);
c.add(2);
await c.close();
```

- **`StreamController.broadcast()`** — nhiều listener; dùng khi nhiều chỗ cùng nghe một luồng sự kiện.

#### Một số phương thức biến đổi (ôn nhanh)

| API | Ý nghĩa |
|-----|---------|
| `map` | Biến đổi từng phần tử |
| `where` | Lọc |
| `take(n)` | Lấy `n` phần tử đầu |
| `asyncMap` | Mỗi phần tử → một `Future` (tránh tắc nếu dùng đúng) |
| `distinct` | Bỏ trùng liên tiếp (nếu có) |

#### Liên hệ Flutter

- **`StreamBuilder<T>`** — rebuild UI mỗi khi có snapshot mới từ stream (tương tự `FutureBuilder` nhưng nhiều sự kiện).  
- **Lưu ý:** đừng tạo `Stream` mới trong `build()` mỗi lần rebuild nếu không chủ ý — dễ **đăng ký lại** listener / lãng phí.

### Dễ nhầm khi thi

- `final` vs `const`: `const` yêu cầu **toàn bộ** biểu thức compile-time.
- Quên `.toList()` sau `map` khi cần `List` cụ thể.
- Dùng `!` thay vì xử lý null an toàn → dễ bị điểm trừ “best practice”.
- **`Never` vs `void`:** `void` = không trả dữ liệu nhưng hàm **vẫn chạy xong**; `Never` = **không** có đường return thành công (thường là `throw` / không kết thúc).
- **`forEach`:** `return`/`break` **không** hoạt động giống vòng `for` truyền thống — dễ sai khi cố “dừng sớm” toàn bộ vòng.
- **Stream single-subscription:** lắng nghe hai lần có thể lỗi; broadcast cần khi **nhiều** listener cùng stream.

### Câu hỏi tự kiểm tra

1. Khác nhau `final` và `const`? Cho ví dụ `const` không hợp lệ với `DateTime.now()`.
2. `?.` và `??` khác nhau thế nào?
3. Vì sao `async` giúp UI Flutter không bị “đơ” khi gọi mạng?
4. Phân biệt `void` và `Never` (cho ví dụ hàm `throw`).
5. Khi nào chọn `for-in` thay vì `forEach`?
6. Single-subscription stream khác broadcast ở điểm nào? Cho một ví dụ dùng `StreamController.broadcast()`.

---

## Module 3 — Dart nâng cao

### Tóm tắt nhanh

Abstract class, implicit interface, `extends` / `implements` / `mixin`, factory, generics, **collection `if` / `for` / spread** (`...`, `...?`, List–Set–Map, Flutter `children`), custom exception, event loop (microtask vs event), Future chaining, Stream + repository pattern.

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

- Trong Flutter, `State<T>` là abstract — bạn `@override` `build()`.

### Implicit interface

- Mọi class Dart đồng thời là **interface**. `implements X` bắt **tự cài lại toàn bộ** API public của `X`, không kế thừa implementation.

### `extends` vs `implements` vs `with`

| Từ khóa | Kế thừa code? | Khi dùng |
|---------|----------------|----------|
| `extends` | Có (một lớp) | Mở rộng class có sẵn |
| `implements` | Không | Cùng “hợp đồng”, tự viết body |
| `with Mixin` | Có (từ mixin) | Tái sử dụng hành vi chéo |

### Mixin & `on` (constraint)

```dart
mixin Walk on Animal {
  void walk() => print('$runtimeType walking');
}
```

- `on Animal` — chỉ class con của `Animal` mới được `with Walk`.

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

- Dùng cho: **singleton**, parse JSON, trả instance đã cache, hoặc subtype.

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

### Collection `if`, `for`, spread (nói rõ)

Đây là cú pháp **bên trong literal** của `List`, `Set` hoặc `Map`: bạn có thể **nhúng điều kiện**, **vòng lặp** và **trải** (spread) phần tử từ collection khác mà không cần tạo list tạm rồi `addAll`.

#### 1. Spread `...` — “trải” phần tử ra

- **`...iterable`:** chèn **lần lượt từng phần tử** của iterable vào collection đang xây.
- Dùng khi bạn muốn **nối** hai list/set, hoặc ghép sẵn một danh sách vào literal.

```dart
final base = [1, 2, 3];
final extended = [0, ...base, 4]; // [0, 1, 2, 3, 4]

final tags = {'a', 'b'};
final allTags = {...tags, 'c'}; // Set: a, b, c
```

- **Spread null-aware `...?`** (Dart 2.3+): nếu biến có thể **`null`**, dùng `...?` để **bỏ qua** khi null thay vì lỗi.

```dart
List<int>? optional;
final x = [1, ...?optional, 2]; // [1, 2] nếu optional == null
```

#### 2. Collection `if` — phần tử có điều kiện

- **`if (điều_kiện) phần_tử`:** chỉ thêm **một** phần tử khi điều kiện đúng.
- **`if (điều_kiện) ...một_iterable`:** thêm **nhiều** phần tử cùng lúc (spread bên trong nhánh `if`).

```dart
final showDebug = true;
final items = [
  'release',
  if (showDebug) 'debug', // có 1 phần tử
  if (showDebug) ...['log', 'trace'], // thêm 2 phần tử
];
// ['release', 'debug', 'log', 'trace']
```

- **`if / else` trong literal:** nhánh `else` cũng có thể là một phần tử hoặc `...list`.

```dart
final mode = 'dark';
final themeChips = [
  if (mode == 'dark') 'Dark' else 'Light',
];
```

#### 3. Collection `for` — sinh phần tử từ vòng lặp

- **`for (vòng_lặp) phần_tử`:** mỗi lần lặp có thể đẩy **một** (hoặc nhiều nếu dùng `...`) phần tử vào collection.

```dart
final base = [1, 2, 3];
final doubled = [for (final x in base) x * 2]; // [2, 4, 6]

// Kết hợp index (for cổ điển trong collection for)
final withIndex = [
  for (var i = 0; i < base.length; i++) '$i:${base[i]}',
];
```

- Có thể lồng **`if` bên trong `for`** (bộ lọc inline):

```dart
final nums = [1, 2, 3, 4];
final evens = [for (final n in nums) if (n.isEven) n]; // [2, 4]
```

#### 4. Dùng trong `Map` literal

- Spread map: **`...otherMap`** để gộp key/value.
- `for` map: mỗi vòng có thể là **`key: value`** (cặp một entry) hoặc dùng pattern tương thích phiên bản Dart bạn học.

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

#### 5. Liên hệ Flutter — `children:` của `Column` / `Row`

Rất hay dùng để **ẩn/hiện widget** hoặc **lặp** widget mà không tách hàm `build` rườm rà:

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

- Lưu ý: mỗi phần tử trong `children` vẫn phải là **`Widget`**; `if`/`for` chỉ là cách **xây list widget** gọn hơn.

#### 6. `const` collection và các cú pháp này

- Literal có **`const`** ở đầu **chỉ** hợp lệ nếu **mọi** giá trị bên trong đều là **compile-time constant** (không gọi hàm runtime, không biến `showDebug` đổi theo state trừ khi nó là `const bool`).
- Trong Flutter, `children: const [ Text('A'), ]` được; còn `if (flag)` với `flag` từ `State` thì **không** bọc được `const` cho cả list — chỉ `const` từng widget con khi được.

#### 7. Tóm tắt nhanh

| Cú pháp | Tác dụng |
|---------|----------|
| `...x` | Trải phần tử của `x` vào list/set/map |
| `...?x` | Trải nếu `x` khác null |
| `if (c) e` | Chèn `e` khi `c` đúng |
| `if (c) ...iterable` | Chèn nhiều phần tử khi `c` đúng |
| `for (...) e` | Lặp sinh phần tử |

### Custom exception

```dart
class LoginException implements Exception {
  LoginException(this.message);
  final String message;
}
```

### Event loop: microtask vs event (nói rõ)

Dart chạy trong **isolate** (tư duy “một luồng” thực thi Dart): tại một thời điểm chỉ có **một đoạn mã Dart đồng bộ** chạy. Mọi thứ “xong rồi làm tiếp” (callback sau `await`, `then`, timer, I/O…) được xếp vào **hàng đợi** để event loop lấy ra chạy sau.

#### Hai hàng đợi chính

| Hàng đợi | Tên tiếng Anh | Độ ưu tiên (tương đối) | Thường chứa gì? |
|----------|----------------|-------------------------|------------------|
| **Microtask** | Microtask queue | **Cao hơn** — được **dọn sạch** trước khi lấy sự kiện “lớn” tiếp theo | `scheduleMicrotask`, `Future.microtask`, và nhiều phần “nối tiếp” sau khi một `Future` hoàn thành (mô hình nội bộ của `async`/`await`) |
| **Event** | Event queue | Sau khi **hết** microtask đang chờ trong nhịp đó | `Future(() { ... })` (constructor `Future` với callback), **timer** (`Future.delayed`), **I/O**, input hệ thống, nhiều callback do Flutter engine/framework lên lịch |

**Quy tắc cốt lõi (mô hình ôn thi):**

1. Chạy hết mã **đồng bộ** hiện tại (ví dụ từ đầu `main()` đến khi nhường).
2. **Lặp:** khi microtask queue **còn** phần tử → lấy và chạy; trong lúc chạy có thể **thêm** microtask mới — **tiếp tục dọn** cho đến khi queue rỗng.
3. Khi microtask queue **rỗng** → lấy **một** sự kiện từ **event queue**, chạy nó.
4. Quay lại bước 2.

```text
[ Đồng bộ ] → [ Dọn sạch microtask queue ] → [ 1 sự kiện event ] → [ Dọn sạch microtask ] → …
```

#### Ví dụ cổ điển (như slide)

```dart
import 'dart:async';

void main() {
  print('A');
  scheduleMicrotask(() => print('micro'));
  Future(() => print('future'));
  print('B');
}
```

**In ra:** `A`, `B`, `micro`, `future`.

**Giải thích ngắn:**

- `A` và `B` là **đồng bộ** → in ngay.
- `scheduleMicrotask` xếp `micro` vào **microtask queue**.
- `Future(() => ...)` xếp `future` vào **event queue** (không chạy ngay).
- Hết đồng bộ → event loop **dọn hết microtask** → in `micro`.
- Microtask rỗng → lấy **một** event → in `future`.

#### Thêm microtask sau một event

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

Thứ tự điển hình: `1`, `2`, `micro-A`, `micro-C` (cùng đợt microtask sau đồng bộ), sau đó `event-1`, rồi **lại** dọn microtask → `micro-B`.  
*(Nếu đề yêu cầu chính xác từng dòng, nên chạy thử trên máy — trọng tâm là **microtask được ưu tiên trước event kế tiếp** sau khi đồng bộ xong.)*

#### Chủ động chọn hàng đợi

| API | Hàng đợi (ôn thi) |
|-----|-------------------|
| `scheduleMicrotask(() { ... })` | Microtask |
| `Future.microtask(() { ... })` | Microtask |
| `Future(() { ... })`, `Future.delayed(...)` | Event |
| `Timer.run`, `Timer.periodic` | Event |

#### Vì sao có microtask?

- Cho phép **khép các bước async liền mạch** (nối tiếp sau Future) trước khi xử lý input/timer khác — tránh xen kẽ không mong muốn.
- **Rủi ro:** vòng lặp vô hạn microtask (mỗi microtask lại `scheduleMicrotask`) có thể **bỏ đói** event queue → UI/timer “đứng”.

#### Liên hệ Flutter (tư duy debug)

- `setState` chạy **đồng bộ** trong lời gọi; việc **vẽ frame** do engine/framework điều phối — không gói gọn trong một dòng “chỉ microtask”, nhưng thứ tự **`await` / `Future((){})` / `addPostFrameCallback`** vẫn bám theo event loop.
- `WidgetsBinding.instance.addPostFrameCallback` chạy **sau khi frame vẽ xong** — hay dùng khi cần `context.size` sau layout; khi xen nhiều `Future` và microtask, hãy nhớ: **đồng bộ trước → dọn microtask → rồi mới tới event**.

#### Một dòng cho trắc nghiệm

- Sau một khối **đồng bộ**, luôn **xử lý hết microtask đang chờ** trước khi chạy callback kiểu **`Future(() {})`** trên event queue.

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

- UI **không** gọi `http.get` rải rác; repository **gom endpoint + parse + lỗi**.
- Test: mock repository, không mock cả Flutter framework.

### Dễ nhầm khi thi

- `implements` một class lớn nhưng chỉ override một phần → **lỗi compile**.
- Nhầm **Stream single-subscription** với broadcast — lắng nghe hai lần sẽ lỗi.
- **`...list` vs `list`:** đặt `list` (không spread) trong literal thì bạn có **một phần tử kiểu List** lồng trong list, không phải “dàn phẳng” phần tử.
- **`...?`:** quên dùng khi iterable có thể `null` → lỗi runtime hoặc phải viết `if (x != null) ...x!` dài hơn.
- **`const [...]`** với `if (biếnState)` — không ép `const` cho cả list nếu điều kiện phụ thuộc runtime.
- Nhầm **`Future(() {})`** với **`Future.microtask`** — cùng “chạy sau” nhưng **hàng đợi khác nhau** → thứ tự in log khác.

### Câu hỏi tự kiểm tra

1. Vì sao repository giúp test dễ hơn so với gọi HTTP trong `build()`?
2. Trong ví dụ `print A/B/micro/future`, vì sao `micro` in **trước** `future`?
3. Factory khác default constructor ở điểm nào?
4. Khác nhau `[...a]` và `[a]` khi `a` là `List<int>`?
5. Viết một `Column` có `children` dùng `if` và `for` (pseudo-code).
6. Nêu quy tắc “dọn microtask” trước khi lấy thêm một sự kiện từ event queue; `scheduleMicrotask` lồng nhau vô hạn gây hậu quả gì?

---

## Module 4 — UI & Widget cơ bản

### Tóm tắt nhanh

Mọi thứ là widget; `StatelessWidget` / `StatefulWidget` + **`setState` (khi gọi, `mounted`, async, tránh trong `build`)**; Scaffold, Theme; ListView; input controls; lỗi layout thường gặp.

### Hai loại widget cốt lõi

| Loại | Khi dùng | Đổi UI? |
|------|----------|---------|
| `StatelessWidget` | UI thuần hiển thị, không state nội bộ | Chỉ khi parent rebuild |
| `StatefulWidget` | Có state đổi theo tương tác | `setState(() { ... })` |

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

### `setState` — nói rõ

`setState` là phương thức của lớp **`State<T>`** (chỉ dùng trong **`StatefulWidget`**). Nó báo cho Flutter: **state nội bộ của widget này đã đổi**, cần **vẽ lại** phần UI do `build` của `State` đó mô tả.

#### `setState` làm gì? (mô hình ôn thi)

1. Bạn cập nhật **biến lưu trong `State`** (field của `_MyPageState`, v.v.).
2. Gọi **`setState(() { ... })`** — khối callback thường chứa phép gán / thay đổi state (hoặc bạn đã đổi state trước đó, callback để trống — **không khuyến khích** vì khó đọc).
3. Framework **đánh dấu** `Element` tương ứng là cần rebuild, rồi ở **khung hình kế tiếp** (hoặc gộp trong cùng frame nếu phù hợp) gọi lại **`build(context)`** của `State` đó.
4. Cây widget con được **so sánh** với lần trước; phần thay đổi mới được cập nhật lên màn hình.

**Tóm một dòng:** `setState` = “state đổi rồi, hãy chạy lại `build` của widget stateful này”.

#### Cú pháp và thói quen tốt

```dart
void _increment() {
  setState(() {
    _count++;
  });
}

// Cũng hay gặp (một biểu thức):
onPressed: () => setState(() => _count++),
```

- **Nên** đặt **mọi thay đổi state “gây đổi UI”** liên quan vào cùng một `setState` (hoặc gom một lần gọi) để dễ theo dõi.
- **Tránh** gọi `setState` **rỗng** sau khi đã sửa state bên ngoài — code vẫn chạy nhưng dễ gây nhầm khi đọc bài thi.

#### Những chỗ **không** nên / không được gọi `setState`

| Tình huống | Vì sao |
|------------|--------|
| Trong **`build()`** | Dễ **vòng lặp vô hạn**: `build` → `setState` → `build` → … |
| Sau khi **`dispose()`** | `State` đã hủy → lỗi **“setState() called after dispose()”** |
| Khi **`mounted == false`** | Widget không còn trên cây — gọi `setState` có thể throw / sai logic |

#### `async` + `setState`: nhớ **`mounted`**

Sau `await`, widget có thể đã **bị pop** hoặc **dispose** — phải kiểm tra trước khi cập nhật UI:

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

#### Phạm vi rebuild (liên hệ Module 12)

- `setState` chỉ kích hoạt rebuild cho **`State` gọi nó** — tức subtree bắt đầu từ **`build` của `StatefulWidget` đó**, không phải rebuild cả `MaterialApp` (trừ khi state nằm quá cao hoặc parent cũng rebuild).
- Nếu state “to” và nằm trên cùng một `State` → **cả màn** có thể rebuild nhiều — khi ôn tối ưu, nên **tách widget con** hoặc dùng **Provider/Selector** (Module 5, 12).

#### So sánh nhanh với cách khác (ôn chéo)

| Cách | Khi nào |
|------|---------|
| `setState` | State **chỉ** dùng trong một màn / một nhánh widget nhỏ |
| `Provider` / `ChangeNotifier` | State dùng **nhiều màn** hoặc nhiều widget xa nhau trên cây |
| `InheritedWidget` | Truyền data xuống cây (Provider build trên nền này) |

### Material app tối thiểu

```dart
void main() => runApp(const MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Demo')),
        body: Center(child: Text('Hello')),
      ),
    ));
```

### Widget thường dùng (gom theo slide)

- **Hiển thị:** `Text`, `Image.asset` / `Image.network` + `fit: BoxFit.cover`, `Icon`, `Card`, `ListTile`, `CircleAvatar`.
- **Nhập liệu / điều khiển:** `TextField`, `Switch`, `Slider`, `RadioListTile`, `showDatePicker`, `showTimePicker`.
- **Bố cục:** `Row`, `Column`, `Expanded`, `Flexible`, `Padding`, `SizedBox`, `Stack` + `Positioned`, `Wrap`, `ListView`, `ListView.builder`.

### ListView trong Column

**Lỗi:** `Vertical viewport was given unbounded height`.

**Cách xử lý phổ biến:**

- Bọc `ListView` bằng `Expanded` (trong `Column` có chiều cao giới hạn).
- Hoặc `ListView(shrinkWrap: true, physics: const NeverScrollableScrollPhysics())` khi nằm trong scroll cha (cẩn thận hiệu năng).

### Theme & Dark mode

- `MaterialApp(theme: ..., darkTheme: ..., themeMode: ThemeMode.system)`.
- `Theme.of(context).colorScheme` — truy cập màu theo Material 3.

### IDE: Wrap with Widget

- VS Code / Android Studio: bọc nhanh `Padding`, `Center`, `Expanded` — tiết kiệm thời gian thi thực hành.

### Dễ nhầm khi thi

- Sửa biến state nhưng **quên `setState`** → UI không đổi.
- Gọi **`setState` trong `build()`** → nguy cơ **lặp vô hạn** / crash.
- Sau **`await`** mà không kiểm tra **`mounted`** → có thể **`setState` sau dispose`**.
- Gọi `showDatePicker` **không** `await` hoặc không có `context` hợp lệ.
- `ListView` vô hạn height trong `Column` không `Expanded`.

### Câu hỏi tự kiểm tra

1. Khác nhau `StatelessWidget` và `StatefulWidget`?
2. `setState` gọi từ đâu, và sau khi gọi framework làm gì tiếp theo (một cách ngắn)?
3. Vì sao không được gọi `setState` trong `build()`?
4. Sau `await` trong `State`, cần kiểm tra gì trước khi `setState`?
5. Nêu hai cách xử lý `ListView` nằm trong `Column`.

---

## Module 5 — Điều hướng & quản lý state

### Tóm tắt nhanh

**Navigator 1.0:** stack route — `push` / `pop` / `pushReplacement` / `pushAndRemoveUntil`; **`MaterialPageRoute`**; **truyền dữ liệu** (constructor, `arguments`, `onGenerateRoute`); **named routes**; **Navigator 2.0** (ý tưởng: stack khai báo + URL); **deep link** Android/iOS; state: **lifting state**, **`InheritedWidget`**, **Provider** (`ChangeNotifier`, `read` / `watch` / `Selector`).

---

### Tổng quan: vì sao cần Navigator?

- Mỗi “màn” trong app thường là một **route** nằm trên **stack** (giống chồng màn hình).
- **Đi tới** màn mới = **đẩy** (push) route lên đỉnh stack; **quay lại** = **lấy** (pop) route trên cùng.
- **`BuildContext`** dùng để tìm `Navigator` gần nhất (`Navigator.of(context)`).

---

### Navigator 1.0 — stack & `Route`

- **`Route`:** mô tả một màn (animation, barrier, fullscreen dialog…).
- **`PageRoute`:** route gắn với một trang — hay gặp **`MaterialPageRoute`** (hiệu ứng Material), **`CupertinoPageRoute`** (iOS-style).

```dart
Navigator.push(
  context,
  MaterialPageRoute<void>(
    builder: (context) => const DetailPage(movieId: 42),
  ),
);
```

#### Các API hay dùng (ôn bảng)

| API | Tác dụng | Ghi chú |
|-----|----------|---------|
| `push` | Đẩy route mới lên **đỉnh** stack | Trả `Future<T?>` — nhận **kết quả** khi màn con `pop` |
| `pop` | Gỡ route trên cùng; có thể `pop(context, result)` | `result` trả về cho `await push` |
| `maybePop` | Pop nếu còn route / cho phép | Trả `Future<bool>` |
| `canPop` | Kiểm tra còn route để pop không | |
| `pushReplacement` | **Thay** route hiện tại bằng route mới (không tăng độ sâu) | Dùng sau login, đổi “root” của flow |
| `pushAndRemoveUntil` | Push rồi **xóa** các route phía dưới đến khi điều kiện đúng | Về Home và xóa stack cũ |
| `popUntil` | Pop liên tục đến khi predicate đúng | |

#### Nhận kết quả từ màn con

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

### Truyền dữ liệu sang màn khác

| Cách | Ưu điểm | Nhược điểm |
|------|---------|------------|
| **Tham số constructor** trong `builder: (_) => DetailPage(id: id)` | Rõ ràng, type-safe | Phải có `builder` trực tiếp |
| **`settings.arguments`** (named route) | Một chỗ khai báo tên route | Thường phải **ép kiểu** `as` / kiểm tra runtime |
| **`onGenerateRoute`** | Parse URL / object phức tạp | Code dài hơn |

Ví dụ **named** + `arguments`:

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

- **`routes`:** map **tên → widget** — thường cho màn **không** cần tham số bắt buộc.
- **`onGenerateRoute`:** khi cần **đọc `settings.arguments`** hoặc parse **deep link** → tạo `Route` tùy ý.
- Luôn gán **`settings: settings`** cho `MaterialPageRoute` nếu tự tạo trong `onGenerateRoute` — giúp `ModalRoute.of(context).settings` nhất quán.

---

### Navigator 2.0 — ý tưởng (ôn lý thuyết)

| Navigator 1.0 | Navigator 2.0 (API mới) |
|-----------------|---------------------------|
| Lệnh **bất tuần tự**: `push` / `pop` từng bước | Mô tả **cả stack route mong muốn** (declarative) |
| Deep link phức tạp khó đồng bộ với URL | Hợp **web** (đường dẫn URL ↔ stack), back/forward trình duyệt |
| Dễ học, đủ cho đa số app mobile | Cần `Router`, `RouterDelegate`, `RouteInformationParser`… — học curve cao |

**Khi ôn thi:** nắm được: **2.0 = đồng bộ UI với URL / stack khai báo**; không cần thuộc lòng toàn bộ boilerplate trừ khi giảng viên yêu cầu.

---

### Deep linking (Android & iOS)

#### Android

- File: **`android/app/src/main/AndroidManifest.xml`** (trong `<activity>` của `MainActivity`).
- Thêm **`<intent-filter>`** với:
  - `<action android:name="android.intent.action.VIEW" />`
  - `<category android:name="android.intent.category.DEFAULT" />`
  - `<category android:name="android.intent.category.BROWSABLE" />`
  - `<data android:scheme="movieapps" android:host="movies" />` (ví dụ slide)
- Ý nghĩa: khi hệ thống mở URL `movieapps://movies?id=12`, có thể chuyển vào app và Flutter nhận URI (xử lý thêm trong `onGenerateRoute` / plugin).

**Test nhanh:**

```text
adb shell am start -a android.intent.action.VIEW -d "movieapps://movies?id=12"
```

#### iOS

- **Universal Links:** bật **Associated Domains** trong Xcode (`applinks:yourdomain.com`).
- **Custom URL scheme:** khai báo **URL Types** trong **Info.plist** (`CFBundleURLSchemes` = ví dụ `movieapps`).
- Flutter nhận link qua cơ chế platform + thường map sang **initial route** hoặc **push** theo path.

---

### Quản lý state (theo slide + mở rộng ôn thi)

#### 1. `setState` (Module 4)

- State **chỉ một nhánh widget** → đủ dùng `setState`.

#### 2. Lifting state up

- Đưa biến chung lên **ancestor** gần nhất mà **cả hai nhánh con** đều là hậu duệ.
- Khi state đổi, ancestor `setState` → **cả subtree** rebuild (cẩn thận perf nếu state “to”).

#### 3. `InheritedWidget`

- **Đẩy data xuống cây** mà không truyền từng tham số qua constructor.
- Widget con gọi **`context.dependOnInheritedWidgetOfExactType<MyData>()`** (hoặc API tương đương) → **đăng ký** rebuild khi `InheritedWidget` cập nhật.
- **Provider** package build sẵn pattern này + `ChangeNotifier` — ít viết `InheritedWidget` thủ công trong bài tập thông thường.

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

**Đọc giá trị:**

| API | Rebuild khi `notifyListeners`? | Khi dùng |
|-----|----------------------------------|----------|
| **`context.watch<CounterModel>()`** | **Có** | Trong `build` khi UI phụ thuộc model |
| **`context.read<CounterModel>()`** | **Không** | Trong callback (`onPressed`, `initState` một lần) — chỉ gọi method |
| **`Consumer<CounterModel>`** | Chỉ subtree trong `builder` | Tách phạm vi rebuild |
| **`Selector<CounterModel, int>`** | Chỉ khi phần chọn (selector) đổi | Giảm rebuild (Module 12) |

```dart
// Chỉ rebuild khi count đổi (ví dụ ý tưởng)
Selector<CounterModel, int>(
  selector: (_, m) => m.count,
  builder: (_, count, __) => Text('$count'),
);
```

- **`MultiProvider`:** gói nhiều `ChangeNotifierProvider` / `Provider` cùng lúc.

#### 5. Khi nào dùng gì? (tóm tắt)

| Nhu cầu | Gợi ý |
|---------|--------|
| State 1–2 widget trong 1 màn | `setState` |
| Chia sẻ state nhiều widget / nhiều màn | **Provider** (hoặc Riverpod/BLoC nếu môn học dạy) |
| Chỉ đọc theme / locale từ context | `Theme.of`, `Localizations` (cơ chế tương tự inherited) |

---

### Điều hướng + auth (pattern slide)

- Sau đăng nhập thành công: **`pushReplacement`** hoặc **`pushNamedAndRemoveUntil(..., (route) => false)`** để **xóa Login** khỏi stack — tránh nút **Back** về lại màn nhập mật khẩu.
- Kết hợp **Provider** giữ `User?` / `isLoggedIn`; `MaterialApp` `home` hoặc route ban đầu phụ thuộc trạng thái (cẩn thận rebuild toàn app — có thể tách `AuthGate`).

---

### Nút Back hệ thống (ôn thêm)

- Trên Android, có thể cần **`PopScope`** / (cũ: `WillPopScope`) để **hỏi trước khi thoát** hoặc **điều hướng tùy điều kiện** — tùy phiên bản Flutter trong đề.

---

### Dễ nhầm khi thi

- Dùng **`push`** cho login → stack vẫn còn **Login** phía dưới → Back về login.
- **`watch`** ở root `build` của `MyApp` → mỗi lần model đổi **rebuild cả cây** → chậm (dùng `read` ở chỗ không cần UI, hoặc `Selector`).
- **`read` trong `build`** mà mong rebuild theo model → **sai** — phải `watch` hoặc `Consumer`.
- Truyền **`arguments`** nhưng quên ép kiểu / null check → lỗi runtime.
- Nhầm **`pushReplacement`** với **`push`** (độ sâu stack khác nhau).

---

### Câu hỏi tự kiểm tra

1. Khác nhau `push` và `pushReplacement`? Cho tình huống “sau login” nên dùng gì?
2. `read` vs `watch` trong Provider — dùng sai chỗ thì hậu quả gì?
3. Làm sao nhận **kết quả** từ màn con sau `Navigator.push`?
4. `routes` tĩnh khác `onGenerateRoute` khi nào?
5. Liệt kê 3 thành phần thường có trong `intent-filter` deep link Android (action + category + data).
6. Navigator 2.0 giải quyết vấn đề gì mà Navigator 1.0 khó với **URL/web**?

---

## Module 6 — Responsive & Adaptive

### Tóm tắt nhanh

**Responsive** = bố cục thay đổi theo **không gian có sẵn** (chiều rộng, constraint). **Adaptive** = thay đổi theo **loại thiết bị / nền tảng** (phone vs tablet, Material vs Cupertino). Công cụ: **`MediaQuery`**, **`LayoutBuilder`**, **`OrientationBuilder`**, **`SafeArea`**, **`GridView`**, **`Wrap`**, **`Flexible`/`Expanded`**.

---

### Responsive vs Adaptive — phân biệt kỹ

| Khái niệm | Dựa vào đâu? | Ví dụ cụ thể |
|-----------|----------------|---------------|
| **Responsive** | **Kích thước vùng hiển thị** (thường là `width` hoặc `constraints.maxWidth`) | `width < 600` → 1 cột; `≥ 600` → 2 cột trong **cùng** một kiểu điều hướng (ví dụ vẫn là `Scaffold` + bottom bar) |
| **Adaptive** | **Form factor / platform** | Điện thoại dùng `BottomNavigationBar`; máy tính bảng rộng dùng **`NavigationRail`** hoặc **drawer cố định**; iOS có thể ưu tiên `CupertinoTabBar` |

**Ví dụ “responsive” thuần** — chỉ đổi số cột, không đổi loại điều hướng:

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

**Ví dụ “adaptive”** — đổi **cả khối điều hướng**:

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

### `MediaQuery` — đọc gì từ màn hình?

`MediaQuery.of(context)` (hoặc các API tách nhỏ như `MediaQuery.sizeOf`) cho biết **bối cảnh hiển thị** của widget — thường là **toàn cửa sổ** (trừ khi bọc `MediaQuery` tùy chỉnh).

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

- **`padding`:** vùng **không** bị tai thỏ/status che — hay dùng để **tự pad** nếu chưa bọc `SafeArea`.
- **`viewInsets.bottom`:** tăng khi **bàn phím** mở — dùng để đẩy nút Submit lên hoặc thêm `padding` đáy `ListView`.

---

### Breakpoints — ví dụ có tên hằng (dễ ôn / dễ sửa)

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

### `LayoutBuilder` — vì sao khác `MediaQuery`?

`LayoutBuilder` nhận **`constraints`** do **widget cha** gán — phản ánh **ô thật** widget đang nằm trong đó, **không** luôn bằng full màn hình.

**Ví dụ:** màn hình 400dp rộng nhưng `Card` chỉ rộng 200dp → `LayoutBuilder` trong `Card` thấy `maxWidth == 200`, trong khi `MediaQuery` vẫn báo 400.

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

**Khi nào dùng gì?**

| Tình huống | Nên dùng |
|------------|-----------|
| Chia layout **cả màn** (2 cột / 1 cột) | `MediaQuery.sizeOf(context).width` thường đủ |
| Layout **trong card, drawer, dialog** | **`LayoutBuilder`** |
| Xoay ngang / dọc | **`OrientationBuilder`** hoặc `MediaQuery.orientationOf` |

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

Bọc nội dung để **tránh** notch, Dynamic Island, home indicator:

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

- Có thể chỉ an toàn một phía: `SafeArea(top: false, child: ...)` nếu `AppBar` đã xử lý phía trên.

---

### `Wrap` — ví dụ chip (slide genre)

`Row` không tự xuống dòng khi hết chỗ → **overflow**. `Wrap` tự **xuống dòng** giống flex-wrap trong CSS.

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

### `GridView` responsive

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

### `Expanded` / `Flexible` trong `Row` / `Column`

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

- **`Expanded`** = `Flexible` với `flex` và `fit: FlexFit.tight` — chiếm hết phần còn lại.

---

### Best practice & kiểm thử

- Tránh `width: 360` cố định cho **toàn app**; ưu tiên **constraint + % + `Expanded`**.
- Kiểm tra trên **điện thoại nhỏ + tablet emulator**; DevTools → **Layout Explorer** xem overflow.

### Dễ nhầm khi thi

- Dùng **`MediaQuery.width`** để quyết định layout **bên trong một khung hẹp** (card, nửa màn split-screen) → sai; dùng **`LayoutBuilder`**.
- Quên **`SafeArea`** → nút hoặc chữ chạm **tai thỏ**.
- **`GridView` trong `Column`** không `Expanded` → lỗi unbounded height (cùng họ với `ListView` trong `Column`).

### Câu hỏi tự kiểm tra

1. Nêu một tình huống **bắt buộc** dùng `LayoutBuilder` thay vì `MediaQuery`.
2. `Wrap` khác `Row` ở điểm nào? Cho ví dụ chip nhiều dòng.
3. `MediaQuery.paddingOf` khác `viewInsetsOf` khi bàn phím mở thế nào?

---

## Module 7 — Form & Validation

### Tóm tắt nhanh

**Form** nhóm nhiều field; **`GlobalKey<FormState>`** để gọi `validate()` / `save()` / `reset()` một lần; **`TextFormField`** + **`validator`** (trả `null` = hợp lệ); **`AutovalidateMode`**; **`FocusNode`** + **`textInputAction`**; form trong **`SingleChildScrollView`**; sau validate → **POST API** (Module 8).

---

### `TextField` vs `TextFormField`

| Widget | Khi dùng |
|--------|----------|
| **`TextField`** | Ô nhập đơn lẻ, tự xử lý lỗi / không cần validate tập thể |
| **`TextFormField`** | Nằm trong **`Form`**, dùng **`validator`**, **`onSaved`**, gắn với `FormState` |

---

### Luồng chuẩn: `validate` → `save` → gửi server

1. User bấm **Submit** → `if (!_formKey.currentState!.validate()) return;`
2. Nếu hợp lệ → ` _formKey.currentState!.save();` — gọi **`onSaved`** từng field để gom vào model / biến.
3. Gọi API (async) — hiển thị loading, xử lý lỗi server (Module 8).

**Vì sao `save()` sau `validate()`?** — Chỉ khi mọi field hợp lệ mới nên “commit” dữ liệu vào object gửi đi; tránh lưu chuỗi rác.

---

### Ví dụ đầy đủ: email + mật khẩu + xác nhận + cuộn + ẩn bàn phím

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

### `validator` — quy tắc

- Kiểu: `String? Function(String? value)`.
- Trả về **`null`** → field **hợp lệ**.
- Trả về **`String`** → chuỗi đó hiển thị **dưới ô** (lỗi).

---

### `AutovalidateMode` — ví dụ cảm nhận UX

| Giá trị | Hành vi | Ví dụ dùng |
|---------|---------|------------|
| `disabled` | Chỉ validate khi gọi `validate()` (thường lúc submit) | Form ngắn, muốn màn “sạch” lúc đầu |
| `always` | Mỗi lần rebuild có thể validate | Dễ “đỏ lòm” ngay khi vào màn — ít dùng |
| **`onUserInteraction`** | Sau khi user **đã chạm** field | Cân bằng: không spam lỗi trước khi gõ |

---

### Async validation (email đã tồn tại) — skeleton

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

- Hiển thị `_emailServerError` qua `InputDecoration(errorText: _emailServerError)` hoặc `SnackBar`.

---

### Dễ nhầm khi thi

- **`Column`** dài + bàn phím → overflow; bọc bằng **`ListView`** hoặc **`SingleChildScrollView`**.
- Quên **`dispose`** `TextEditingController` / `FocusNode`.
- So khớp mật khẩu mà không `.trim()` email nếu đề yêu cầu chuẩn hóa khoảng trắng.

### Câu hỏi tự kiểm tra

1. `validator` trả `null` nghĩa là gì?
2. Vì sao nên `validate()` trước `save()`?
3. `GestureDetector` bọc form + `unfocus` để làm gì?
4. Khi nào cần `mounted` check sau `await` trong submit form?

---

## Module 8 — REST API & JSON

### Tóm tắt nhanh

**REST** = resource + method HTTP; **`http`** package; **`Uri.parse`**; **`jsonEncode`/`jsonDecode`**; **model `fromJson`**; **`FutureBuilder`** hoặc `StatefulWidget` + `setState`; **service layer**; **Bearer token** (Module 10); **không** gọi mạng trong `build()`.

---

### HTTP & REST — ví dụ “resource”

| Method | Ý nghĩa | Ví dụ endpoint (giả) |
|--------|---------|----------------------|
| **GET** | Lấy dữ liệu (idempotent) | `GET /posts`, `GET /posts/1` |
| **POST** | Tạo mới / hành động có body | `POST /posts` body JSON |
| **PUT/PATCH** | Thay / sửa resource | `PATCH /posts/1` |
| **DELETE** | Xóa | `DELETE /posts/1` |

**Mã trạng thái (hay hỏi):**

| Mã / dải | Ý nghĩa thường gặp |
|-----------|---------------------|
| **200** | OK — GET/PUT thành công |
| **201** | Created — POST tạo mới |
| **204** | No Content — xóa thành công không body |
| **400** | Bad Request — JSON sai định dạng |
| **401** | Unauthorized — **chưa / sai** xác thực |
| **403** | Forbidden — đã đăng nhập nhưng **không đủ quyền** |
| **404** | Not Found |
| **422** | Unprocessable Entity — validation server (Laravel hay dùng) |
| **500+** | Lỗi server |

---

### GET + parse `List` JSON — ví dụ hoàn chỉnh

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

### Model `fromJson` — ví dụ an toàn hơn một chút

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

- Nếu API đôi khi trả **số thực** cho `id`, có thể dùng `(json['id'] as num).toInt()` — tùy đề bài.

---

### POST JSON + đọc lỗi body

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

### Gọi API có **Bearer token** (nối Module 10)

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

### `FutureBuilder` — pattern + **sai lầm thường gặp**

**Đúng:** tạo `Future` **một lần** (state field khởi tạo trong `initState` hoặc `late final` lần đầu).

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

**Sai:** `future: fetchPosts()` **trực tiếp trong `build()`** mỗi lần rebuild → gọi API lặp.

---

### Service layer — ví dụ có thể inject `Client` (test giả lập)

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

- Test unit: truyền `MockClient` trả body cố định — không cần mạng thật.

---

### Bắt lỗi mạng

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

### Dễ nhầm khi thi

- Gọi API trong `build()`.
- Không kiểm tra `statusCode` — body có thể là trang lỗi HTML.
- `as Type` sai → **runtime cast error**.

### Câu hỏi tự kiểm tra

1. Vì sao `future:` trong `FutureBuilder` không nên tạo mới mỗi `build()`?
2. **401** và **403** khác nhau thế nào?
3. `Repository` tách khỏi `Widget` giúp test / bảo trì ra sao?

---

## Module 9 — Lưu trữ cục bộ

### Tóm tắt nhanh

Ba tầng: **`SharedPreferences`** (key–value), **file JSON** (`path_provider` + `dart:io`), **SQLite qua `sqflite`**; chiến lược **offline-first**; chọn công cụ theo **kích thước + cấu trúc + query**.

---

### Vì sao cần lưu local?

- **Offline:** mở app không cần mạng vẫn xem dữ liệu đã lưu.
- **Tốc độ:** đọc disk nhanh hơn chờ API mỗi lần.
- **Trải nghiệm:** nhớ theme, token, bộ lọc, danh sách yêu thích.

---

### SharedPreferences — ví dụ lifecycle: load → toggle → lưu

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

- **Kiểu hỗ trợ:** `String`, `int`, `double`, `bool`, `List<String>`.
- **Object phức tạp:** `jsonEncode` → lưu **một** `String` (hoặc dùng file / SQLite).

---

### `path_provider` — chọn thư mục

| API | Thường dùng cho |
|-----|------------------|
| `getApplicationDocumentsDirectory()` | File **user** cần giữ lâu (ghi chú, cache JSON) |
| `getTemporaryDirectory()` | Cache tạm — OS có thể xóa |

---

### File JSON — đọc + ghi đầy đủ

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

### SQLite + `sqflite` — ví dụ tối thiểu (ôn thi)

Cần dependency `sqflite` và `path` trong `pubspec.yaml`.

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

- **`sqflite`** = plugin Flutter **bridge** tới engine **SQLite** — không phải “một DB khác” SQLite.
- **Web:** `sqflite` truyền thống **không** chạy như mobile; cần giải pháp khác (IndexedDB, Drift, v.v.).

---

### Offline-first — mô hình

```text
1. Đọc DB / file local → hiển thị ngay (có thể “cũ”)
2. Nếu có mạng → gọi API lấy bản mới
3. Merge / ghi đè local
4. Nếu conflict → dùng timestamp / “last write wins” / hỏi user (tùy nghiệp vụ)
```

---

### Chọn công cụ — bảng quyết định

| Nhu cầu | Gợi ý |
|---------|--------|
| Cài đặt nhỏ, flag | SharedPreferences |
| Danh sách vừa, export JSON | File |
| Nhiều bảng, query, index | SQLite (`sqflite`) |
| Đồng bộ lâu dài | SQLite + API/Firebase |

### Dễ nhầm khi thi

- Lưu mật khẩu dạng plain trong Prefs — mật khẩu thật **hash** ở server; token nhạy cảm ưu tiên **secure storage** nếu đề hỏi bảo mật.
- Gọi `getInstance()` mỗi lần bấm nút không sao (async nhẹ), nhưng **batch** nhiều `set` nên gom một lần nếu có thể.

### Câu hỏi tự kiểm tra

1. Khi nào chọn file JSON thay vì SharedPreferences?
2. `getApplicationDocumentsDirectory` khác `getTemporaryDirectory` thế nào?
3. Viết một câu `CREATE TABLE` đơn giản và `insert` tương ứng (pseudo-code).
4. Offline-first là gì?

---

## Module 10 — Xác thực, phiên & thông báo

### Tóm tắt nhanh

**Authentication** vs **Authorization**; **JWT** (header–payload–signature); **login/signup** + validate; **mock** vs **API thật**; **session** lưu token → **Splash** auto-login; **Firebase + Google Sign-In**; **local notification** sau khi đăng nhập; **HTTPS**, Bearer header, **không** log token.

---

### Auth vs Authorization — ví dụ đời thường

| Khái niệm | Câu hỏi | Ví dụ |
|-----------|---------|--------|
| **Authentication** | Bạn là ai? | Đăng nhập email/mật khẩu → server trả token |
| **Authorization** | Bạn được phép làm gì? | Token có `role: admin` mới gọi `DELETE /users/1` |

---

### Luồng token (slide + ví dụ header)

1. `POST /login` body `{ "email", "password" }`.
2. **200** + JSON `{ "accessToken": "...", "refreshToken": "..." }`.
3. App lưu token (Prefs / secure storage).
4. **GET /profile** với header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Accept: application/json
```

5. Access hết hạn → `POST /refresh` gửi refresh → nhận access mới.
6. **401** sau khi refresh thất bại → xóa session, về Login.

---

### JWT — giải thích ngắn (không cần giải mã thủ công trong thi)

- Chuỗi gồm **3 phần** nối bởi `.` : **header.payload.signature** (Base64URL).
- **Ký** (HMAC/RSA) để server **xác minh** token không bị sửa; **payload** (claims) có thể **đọc được** bằng Base64 decode — **không** coi là “mã hóa bí mật”.
- Claim hay gặp: **`exp`** (hết hạn), **`sub`** (user id), **`email`**, **`role`**.

---

### UI login — checklist + skeleton `AuthService` (mock)

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

### Mock vs Real API

| | Mock | Real (DummyJSON, v.v.) |
|---|------|-------------------------|
| Mạng | Không cần | Cần |
| Ổn định demo | Cao | Phụ thuộc server |
| Học HTTP thật | Hạn chế | Đầy đủ |

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

1. Tạo project Firebase, thêm app Android đúng **`applicationId`** (`android/app/build.gradle`).
2. Lấy **SHA-1 / SHA-256** (debug keystore) đưa vào Firebase.
3. Tải **`google-services.json`** → `android/app/`.
4. **`android/build.gradle.kts` / `settings.gradle`:** classpath `com.google.gms:google-services` (theo doc phiên bản).
5. **`android/app/build.gradle`:** `apply plugin: 'com.google.gms.google-services'`.
6. **`pubspec.yaml`:** `firebase_core`, `firebase_auth`, `google_sign_in`.
7. Console Firebase: bật **Google** sign-in provider.

**Lỗi thường gặp:** thiếu SHA-1 → không chọn được tài khoản; sai package name; emulator không có Play Services.

---

### Local notification (ý tưởng)

- Sau login thành công: gọi service notification (plugin `flutter_local_notifications`) — **tách** khỏi `AuthService` để dễ test.

---

### Bảo mật (điểm số)

- Luôn **HTTPS**; không `print(token)` trong log production.
- Mật khẩu **hash server**; **refresh token** lưu an toàn hơn access nếu đề hỏi sâu.

### Dễ nhầm khi thi

- Nhầm **JWT signed** với “payload không ai đọc được”.
- Lưu token mà không xử lý **401** / hết hạn.

### Câu hỏi tự kiểm tra

1. Access token và refresh token khác vai trò thế nào?
2. Viết **một** header HTTP gửi kèm Bearer token.
3. Vì sao sau login nên `pushReplacement`?
4. Liệt kê 4 bước cấu hình Android cho Google Sign-In (theo slide).

---

## Module 11 — Kiểm thử & gỡ lỗi

### Tóm tắt nhanh

**Kim tự tháp:** nhiều **unit**, vừa **widget**, ít **integration**; `flutter_test`: **`test`**, **`testWidgets`**, **`pump` / `pumpAndSettle`**, **`find`**, **`expect`**; **arrange–act–assert**; DevTools (Inspector, Performance, Memory).

---

### Ba loại test — so sánh kỹ

| Loại | Mục tiêu | Chạy ở đâu | Ví dụ |
|------|----------|------------|--------|
| **Unit** | Hàm thuần, model, repository (mock HTTP) | Máy dev, không cần emulator | `expect(task.completed, true)` sau `toggle()` |
| **Widget** | Render + tương tác (tap, nhập text) | Test engine (`flutter test`) | Tìm `TextField`, `tap` nút Add, `expect` text xuất hiện |
| **Integration** | Luồng đầu–cuối trên thiết bị / driver | **integration_test** + emulator hoặc máy thật | Mở app → login → vào màn hình X |

**Vì sao nhiều unit ít integration?** — Unit/widget **nhanh, ổn định**; integration **chậm, dễ vỡ** (mạng, timing), nên chỉ giữ các **luồng cực kỳ quan trọng**.

---

### Unit test — ví dụ đầy đủ

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

- **Arrange:** tạo `Task` ban đầu.
- **Act:** gọi `toggle()`.
- **Assert:** `expect` đúng trạng thái.

---

### Widget test — ví dụ đầy đủ

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

**`find` hay dùng:**

| Matcher | Khi nào |
|---------|---------|
| `find.text('A')` | Tìm `Text` chứa đúng chuỗi |
| `find.byType(TextField)` | Tìm loại widget |
| `find.byKey(const Key('save'))` | Ổn định khi nhiều nút giống nhau |

---

### `pump` vs `pumpAndSettle`

| API | Tác dụng |
|-----|----------|
| **`pump()`** | Vẽ một frame / xử lý microtask ngay lập tức — dùng sau `tap`/`enterText` |
| **`pumpAndSettle()`** | Pump đến khi **không còn** animation/timer chờ — cần khi có **Animation**, **FutureBuilder** đợi lâu |

```dart
await tester.tap(find.text('Next'));
await tester.pumpAndSettle(); // chờ transition sang màn mới
expect(find.text('Chi tiết'), findsOneWidget);
```

---

### Test điều hướng (ý tưởng)

```dart
await tester.tap(find.text('Mở chi tiết'));
await tester.pumpAndSettle();
expect(find.byType(DetailScreen), findsOneWidget);
```

---

### Mock repository (ý tưởng)

```dart
class FakeTaskRepo implements TaskRepository {
  @override
  Future<List<Task>> load() async => [Task(title: 'A', completed: false)];
}
```

- Inject vào widget qua constructor hoặc `Provider` — test **không** gọi API thật.

---

### DevTools — gỡ lỗi khi chạy app thật

| Công cụ | Dùng |
|---------|------|
| **Widget Inspector** | Xem cây widget, constraints, overflow |
| **Performance** | Timeline frame, jank |
| **Memory** | Nghi ngờ leak / giữ reference quá lớn |

---

### Best practice

- Một `test` / `testWidgets` = **một hành vi** rõ ràng.
- Đặt **`Key`** cho widget khó `find`.
- Không assert **implementation** nội bộ Flutter (ví dụ số lượng `RenderObject`).

### Dễ nhầm khi thi

- Quên **`pump`** sau `tap` → `expect` chạy trước khi rebuild.
- Nhầm **widget test** với **integration** — integration cần package `integration_test` + driver.

### Câu hỏi tự kiểm tra

1. Vì sao kim tự tháp khuyên nhiều unit hơn integration?
2. `pump` và `pumpAndSettle` khác nhau khi nào?
3. Viết một đoạn `testWidgets` tối thiểu: `pumpWidget` → `tap` → `expect`.

---

## Module 12 — Hiệu năng & triển khai

### Tóm tắt nhanh

**Widget immutable** → `build()` phải nhẹ; **`const`**, **tách widget**, **`ListView.builder`**, **`ValueKey`**, **Provider `Selector`**; **ảnh** resize/cache; **DevTools Profile**; **APK/AAB**; **`versionCode` / `versionName`**; ký app (Play).

---

### Ba chế độ build — ví dụ lệnh

| Mode | Lệnh / cách chạy | Đặc điểm |
|------|------------------|----------|
| **Debug** | `flutter run` | Assertions, hot reload, **chậm** hơn release |
| **Profile** | `flutter run --profile` | Gần release, bật **DevTools** đo timeline CPU/GPU |
| **Release** | `flutter run --release` / `flutter build apk` | Tối ưu, **không** hot reload |

**Đo FPS / jank:** dùng **Profile** hoặc **Release** — **không** kết luận từ Debug.

---

### Render pipeline — một câu cho đề

```text
Widget (cấu hình) → Element (vị trí + state) → RenderObject (layout + paint)
```

- `build()` chỉ **mô tả** widget mới; framework **diff** và cập nhật tối thiểu.
- Việc **nặng** trong `build()` (sort 10⁶ phần tử, `http.get`, decode ảnh lớn) → **drop frame**.

---

### Ví dụ **không** làm trong `build()`

```dart
// ❌ Anti-pattern
@override
Widget build(BuildContext context) {
  final sorted = List.of(items)..sort(); // mỗi frame sort lại
  http.get(Uri.parse('https://...'));     // gọi mạng mỗi frame
  return ListView(children: sorted.map((e) => Text('$e')).toList());
}
```

**Cách sửa:** sort **một lần** khi data đổi (`initState` / sau `await` / `setState`); HTTP trong repository gọi từ `initState` hoặc nút refresh.

---

### Checklist tối ưu (kèm ví dụ ngắn)

1. **`const Text('X')`** — không tạo object mới mỗi frame nếu không cần.
2. **Tách `TaskTile`** — khi `notifyListeners` / `setState` chỉ đổi một item, parent list không cần rebuild toàn bộ nếu tách đúng.
3. **`ListView.builder`** — chỉ build item **trong viewport**.

```dart
ListView.builder(
  itemCount: tasks.length,
  itemBuilder: (context, i) => TaskTile(
    key: ValueKey(tasks[i].id),
    task: tasks[i],
  ),
);
```

4. **`ValueKey(id)`** — giúp framework nhận diện item khi reorder.
5. **`Selector`** — chỉ rebuild khi `count` đổi, không khi field khác trong model đổi.
6. **Ảnh:**

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

### Phân tích kích thước

```bash
flutter build apk --release --analyze-size
```

- Xem treemap: **Dart AOT**, **native .so**, **assets** — xóa asset / dependency thừa.

---

### Build release — lệnh & đầu ra

```bash
flutter build apk --release
# → build/app/outputs/flutter-apk/app-release.apk

flutter build appbundle --release
# → build/app/outputs/bundle/release/app-release.aab  (Play Store)
```

**Phiên bản Android** (`android/app/build.gradle` hoặc `.kts`):

```gradle
defaultConfig {
    versionCode 12        // số nguyên tăng mỗi lần upload Play
    versionName "1.2.0"   // hiển thị cho user
}
```

---

### Ký app (khái niệm ôn thi)

- Tạo **keystore** → file `key.properties` → Gradle trỏ tới **signingConfigs** cho `release`.
- Play App Signing: Google có thể giữ khóa ký — nộp **AAB** đã ký upload key.

---

### Dễ nhầm khi thi

- Benchmark trên **Debug**.
- `UniqueKey()` mỗi lần build item → Flutter coi **mọi item mới** → mất state scroll.
- `watch` ở root → rebuild khổng lồ.

### Câu hỏi tự kiểm tra

1. Liệt kê **4** việc không nên làm trong `build()`.
2. Vì sao **Profile** đo jank đáng tin hơn **Debug**?
3. **APK** vs **AAB** khi đưa lên Play Store?
4. `versionCode` khác `versionName` thế nào?

---

## So sánh hay gặp trong đề / vấn đáp

Bảng dưới là **mục tiêu trả lời nhanh**; phần chi tiết + ví dụ nằm ở các Module 6–12 phía trên.

| Cặp khái niệm | Phân biệt ngắn |
|---------------|----------------|
| `Stateless` vs `Stateful` | Có state nội bộ + `setState` hay không |
| `final` vs `const` | Runtime constant vs compile-time constant |
| `extends` vs `implements` | Có kế thừa implementation hay không |
| `ListView` vs `ListView.builder` | Builder lazy — phù hợp list dài |
| `watch` vs `read` (Provider) | Listen rebuild vs chỉ lấy một lần |
| MediaQuery vs LayoutBuilder | Kích thước màn vs constraint của cha |
| Responsive vs Adaptive | Theo **width** vs theo **loại thiết bị** (rail vs bottom bar) |
| `TextField` vs `TextFormField` | Form tập thể + validator |
| GET vs POST | Lấy dữ liệu vs gửi tạo mới / submit |
| SharedPreferences vs SQLite | Key-value đơn giản vs quan hệ/query |
| Auth vs Authorization | Ai bạn là vs bạn được phép gì |
| Hot Reload vs Hot Restart | Giữ state khi có thể vs reset state |
| Debug vs Profile vs Release | Dev / đo perf / production |
| JWT signed vs “mã hóa” | Ký chống sửa; payload vẫn đọc được nếu không mã hóa thêm |
| `pump` vs `pumpAndSettle` (test) | Một frame vs chờ hết animation/async |

---

## Bảng tra cứu nhanh

| Chủ đề | Ghi nhớ một dòng |
|--------|-------------------|
| Kiến trúc | Framework (Dart) / Engine (C++) / Embedder |
| UI | Mọi thứ là widget; composition over inheritance |
| State | `setState`, `InheritedWidget`, `Provider` |
| Nav | Stack; `push`/`pop`; named routes; deep link native config |
| Layout | Constraints; `Expanded`; scroll vs unbounded height |
| Responsive | `MediaQuery`, `LayoutBuilder`, breakpoints |
| Form | `Form` + `GlobalKey<FormState>` + `validator` trả `null` = OK |
| API | `http` + `jsonDecode` + model + `FutureBuilder` + service |
| Lưu trữ | Prefs / file JSON / sqflite theo độ phức tạp |
| Auth | JWT + Bearer header + lưu session + Splash |
| Test | Unit nhiều — Widget vừa — Integration ít |
| Perf | `const`, tách widget, không nặng trong `build`, `builder` list |
| Ship | `versionCode++`, AAB Play, test Profile trước |

---

## Gợi ý ôn thi (kế hoạch 1–2 ngày)

1. **Lý thuyết 30 phút:** đọc bảng “So sánh hay gặp” và **tự nói** ví dụ minh họa từng dòng (không nhìn tài liệu).
2. **Thực hành 2 giờ:** một màn **Form validate** → **POST** JSON → **FutureBuilder** list → **lưu token** SharedPreferences → **Splash** chọn Login/Home.
3. **Thực hành 1 giờ:** `ListView.builder` + **navigate** detail với **tham số** + `pop` trả `result`.
4. **Responsive 45 phút:** một màn dùng **`MediaQuery` breakpoint** + **`LayoutBuilder`** trong card (hai kiểu khác nhau).
5. **Ôn perf 30 phút:** nêu **6** kỹ thuật Module 12 + **một** đoạn anti-pattern trong `build()`.
6. **Ôn test 30 phút:** viết được skeleton `testWidgets`: `pumpWidget` → `enterText` → `tap` → `pump` → `expect`.

---

*Tổng hợp từ slide Module 1–12; phần code minh họa là chuẩn hóa để ôn — có thể khác nhỏ so với template giảng viên. Nếu đề thi bắt đúng API cụ thể (Riverpod, go_router, v.v.), bổ sung theo giáo trình.*
