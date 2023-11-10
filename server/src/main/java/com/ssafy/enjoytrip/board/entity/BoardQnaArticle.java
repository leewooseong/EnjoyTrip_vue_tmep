package com.ssafy.enjoytrip.board.entity;

import com.ssafy.enjoytrip.common.entity.BaseTime;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Builder
@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardQnaArticle extends BaseTime {

    @Id
    @GeneratedValue
    private Long articleId;

    private String userNick;
    private String title;
    private String content;
    private int hit;
}
