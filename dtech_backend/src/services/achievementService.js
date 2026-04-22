const db = require('../config/db');

const parseTechnologies = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'object') return [value];
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error('Gagal parse technologies:', error);
    return [];
  }
};

exports.getAllAchievements = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM achievements
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return reject({ status: 500, message: 'Error ambil data' });
      }
      resolve(results);
    });
  });
};

exports.getAchievementDetail = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM achievements WHERE id = ?', [id], (err, achievementResult) => {
      if (err) return reject({ status: 500, message: err.message });
      if (achievementResult.length === 0) return reject({ status: 404, message: 'Data tidak ditemukan' });

      const achievement = achievementResult[0];

      db.query(
        'SELECT * FROM achievement_sections WHERE achievement_id = ? ORDER BY order_index ASC',
        [id],
        (err, sections) => {
          if (err) return reject({ status: 500, message: err.message });

          db.query(
            'SELECT * FROM achievement_images WHERE achievement_id = ? ORDER BY order_index ASC',
            [id],
            (err, images) => {
              if (err) return reject({ status: 500, message: err.message });

              resolve({
                ...achievement,
                sections,
                images,
                technologies:       parseTechnologies(achievement.technologies),
                recognition_image:  achievement.recognition_image  || null,
                bottom_description: achievement.bottom_description || null,
                hero_description:   achievement.hero_description   || null,
              });
            }
          );
        }
      );
    });
  });
};

exports.createAchievement = (data) => {
  return new Promise((resolve, reject) => {
    const {
      category,
      title,
      slug,
      subtitle,
      short_description,
      hero_description,       // ← baru
      full_description,
      thumbnail_image,
      attendees,
      technologies,
      recognition_image,
      bottom_description,
      sections,
      images,
    } = data;

    const insertAchievement = `
      INSERT INTO achievements (
        category,
        title,
        slug,
        subtitle,
        short_description,
        hero_description,
        full_description,
        thumbnail_image,
        attendees,
        technologies,
        recognition_image,
        bottom_description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertAchievement,
      [
        category          || null,
        title,
        slug,
        subtitle          || null,
        short_description,
        hero_description  || null,   // ← baru
        full_description  || null,
        thumbnail_image,
        attendees         || null,
        JSON.stringify(technologies || []),
        recognition_image  || null,
        bottom_description || null,
      ],
      (err, result) => {
        if (err) return reject({ status: 500, message: err.message });

        const achievementId = result.insertId;

        if (sections && sections.length > 0) {
          const sectionValues = sections.map(sec => [
            achievementId,
            sec.section_type,
            sec.title,
            sec.content,
            sec.image || null,
            sec.order_index,
          ]);
          db.query(
            'INSERT INTO achievement_sections (achievement_id, section_type, title, content, image, order_index) VALUES ?',
            [sectionValues],
            (err) => { if (err) return reject({ status: 500, message: err.message }); }
          );
        }

        if (images && images.length > 0) {
          const imageValues = images.map(img => [achievementId, img.image_url, img.order_index]);
          db.query(
            'INSERT INTO achievement_images (achievement_id, image_url, order_index) VALUES ?',
            [imageValues],
            (err) => { if (err) return reject({ status: 500, message: err.message }); }
          );
        }

        resolve({ id: achievementId });
      }
    );
  });
};

exports.updateAchievement = (id, data) => {
  return new Promise((resolve, reject) => {
    const {
      category,
      title,
      slug,
      subtitle,
      short_description,
      hero_description,       // ← baru
      full_description,
      thumbnail_image,
      attendees,
      technologies,
      recognition_image,
      bottom_description,
      sections,
      images,
    } = data;

    const updateAchievement = `
      UPDATE achievements SET
        category          = ?,
        title             = ?,
        slug              = ?,
        subtitle          = ?,
        short_description = ?,
        hero_description  = ?,
        full_description  = ?,
        thumbnail_image   = ?,
        attendees         = ?,
        technologies      = ?,
        recognition_image  = ?,
        bottom_description = ?
      WHERE id = ?
    `;

    db.query(
      updateAchievement,
      [
        category          || null,
        title,
        slug,
        subtitle          || null,
        short_description,
        hero_description  || null,   // ← baru
        full_description  || null,
        thumbnail_image,
        attendees         || null,
        JSON.stringify(technologies || []),
        recognition_image  || null,
        bottom_description || null,
        id,
      ],
      (err) => {
        if (err) return reject({ status: 500, message: err.message });

        // replace sections
        db.query('DELETE FROM achievement_sections WHERE achievement_id = ?', [id], (err) => {
          if (err) return reject({ status: 500, message: err.message });

          if (sections && sections.length > 0) {
            const sectionValues = sections.map(sec => [
              id,
              sec.section_type,
              sec.title,
              sec.content,
              sec.image || null,
              sec.order_index,
            ]);
            db.query(
              'INSERT INTO achievement_sections (achievement_id, section_type, title, content, image, order_index) VALUES ?',
              [sectionValues],
              (err) => { if (err) return reject({ status: 500, message: err.message }); }
            );
          }

          // replace images
          db.query('DELETE FROM achievement_images WHERE achievement_id = ?', [id], (err) => {
            if (err) return reject({ status: 500, message: err.message });

            if (images && images.length > 0) {
              const imageValues = images.map(img => [id, img.image_url, img.order_index]);
              db.query(
                'INSERT INTO achievement_images (achievement_id, image_url, order_index) VALUES ?',
                [imageValues],
                (err) => { if (err) return reject({ status: 500, message: err.message }); }
              );
            }

            resolve();
          });
        });
      }
    );
  });
};

exports.softDeleteAchievement = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE achievements
      SET deleted_at = NOW()
      WHERE id = ? AND deleted_at IS NULL
    `;
    db.query(query, [id], (err, result) => {
      if (err) return reject({ status: 500, message: 'Error saat delete data' });
      if (result.affectedRows === 0) return reject({ status: 404, message: 'Data tidak ditemukan atau sudah dihapus' });
      resolve();
    });
  });
};

exports.restoreAchievement = (id) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE achievements SET deleted_at = NULL WHERE id = ?', [id], (err, result) => {
      if (err) return reject({ status: 500, message: err.message });
      if (result.affectedRows === 0) return reject({ status: 404, message: 'Data tidak ditemukan' });
      resolve();
    });
  });
};