package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.incoming.BookingForm;
import hu.progmasters.moovsmart.dto.incoming.OpenHouseForm;
import hu.progmasters.moovsmart.dto.outgoing.OpenHouseListItem;
import hu.progmasters.moovsmart.service.BookingService;
import hu.progmasters.moovsmart.service.OpenHouseService;
import hu.progmasters.moovsmart.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<Void> createBooking (@RequestBody BookingForm bookingForm,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        bookingService.createBooking(bookingForm, token);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}
