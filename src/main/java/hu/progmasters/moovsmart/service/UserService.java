package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.dto.incoming.UserForm;
import hu.progmasters.moovsmart.repository.UserRepository;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        hu.progmasters.moovsmart.domain.user.User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email not found!"));


        String[] roles = user.getRoles().stream()
                .map(Enum::toString)
                .toArray(String[]::new);

        return User
                .withUsername(user.getEmail())
                .authorities(AuthorityUtils.createAuthorityList(roles))
                .password(user.getPasswordHash())
                .build();
    }

    public void registerUser(UserForm userForm) {
        hu.progmasters.moovsmart.domain.user.User user = new hu.progmasters.moovsmart.domain.user.User(userForm);
        user.setPasswordHash(passwordEncoder.encode(userForm.getPassword()));
        userRepository.save(user);
    }

}
