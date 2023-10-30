/**
 * JwtPayload 인터페이스는 JWT 토큰의 payload 부분의 타입을 정의합니다.
 *
 * @property {string} sub - 사용자의 고유 식별자로 사용됩니다. 예를 들어, 데이터베이스의 사용자 ID가 될 수 있습니다.
 * @property {number} [iat] - 토큰이 발행된 시간을 나타냅니다. Unix Timestamp 형식입니다. Optional입니다.
 * @property {number} [exp] - 토큰의 만료 시간을 나타냅니다. Unix Timestamp 형식입니다. Optional입니다.
 *
 * JWT 토큰은 이 외에도 추가적인 클레임을 포함할 수 있습니다.
 * 필요에 따라 인터페이스를 확장하여 추가적인 정보를 타입 안전하게 사용할 수 있습니다.
 * @author Hojun Song
 */
interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
  // 필요하다면 여기에 추가적인 클레임들을 정의할 수 있습니다.
}
