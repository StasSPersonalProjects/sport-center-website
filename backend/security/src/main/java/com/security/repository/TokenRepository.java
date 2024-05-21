package com.security.repository;

import com.security.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query(value = """
      select t from Token t inner join User u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
    List<Token> findAllValidTokenByUser(Integer id);

    Optional<Token> findByToken(String token);

    @Query(value = "SELECT COUNT(*) > 0 FROM token WHERE token = :token AND expired = false AND revoked = false",
            nativeQuery = true)
    Long isTokenExistsAndNotExpired(@Param("token") String token);

    default boolean isTokenExistsAndValid(String token) {
        Long result = isTokenExistsAndNotExpired(token);
        return result > 0;
    }

    @Query(value = "SELECT user_id FROM token WHERE token = :token AND expired = false AND revoked = false",
            nativeQuery = true)
    Integer findUserIdByValidToken(@Param("token") String token);
}